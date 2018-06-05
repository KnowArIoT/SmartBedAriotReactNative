// @flow

import React, { Component } from 'react';
import { View, Text, Slider, Alert, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoadingView from 'react-native-loading-view';
import TimePicker from 'react-native-simple-time-picker';
import { startLoading, stopLoading } from '../../actions';
import { SHOULD_MOCK } from '../../constants';
import { SmartBedUrler } from '../util/RequestHelper';
import CustomClickButton from '../components/CustomClickButton';
import CustomHoldButton from '../components/CustomHoldButton';


const styles = require('./../styles');

type Props = {
  t: Function,
  navigation: Object,
  loading: boolean,
  networkEnabled: boolean,
  dispatchStartLoading: () => void,
  dispatchStopLoading: () => void
};

type State = {
  dimValue: number,
  bedAngleHeadValue: number,
  bedAngleFeetValue: number,
  selectedHours: number,
  selectedMinutes: number,
  alarmButtonPressed: boolean,
  alarmSet: boolean
}

class BedControlPage extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      dimValue: 50,
      bedAngleHeadValue: 0,
      bedAngleFeetValue: 0,
      selectedHours: 10,
      selectedMinutes: 45,
      alarmButtonPressed: false,
      alarmSet: false
    };
  }

  changeDimValue(value) {
    this.setState(() => {
      return {
        dimValue: parseFloat(value),
      };
    });
  }

  slidingLightComplete(value) {
    this.lightControl(null, value);
  }

  lightControl(on, dimValue) {
    this.fetchData(on == null ? SmartBedUrler.dimLight + String(dimValue) : on ? SmartBedUrler.toggleLightOn : SmartBedUrler.toggleLightOff);
  }

  ledControl(on) {
    this.fetchData(on ? SmartBedUrler.toggleLedOn : SmartBedUrler.toggleLedOff);
  }

  bedAngleHeadControl(value) {
    this.fetchData(SmartBedUrler.setHeadAngle + String(value))
  }

  bedAngleFeetControl(value) {
    this.fetchData(SmartBedUrler.setFeetAngle + String(value))
  }

  heatControl(on) {
    this.fetchData(on ? SmartBedUrler.toggleHeatOn : SmartBedUrler.toggleHeatOff)
  }

  scemeControl(val) {
    this.fetchData(val == "sleep" ? SmartBedUrler.sleep : SmartBedUrler.wakeup);
  }

  alarmControl() {
    this.fetchData(SmartBedUrler.setAlarm);
  }

  bedControl(startOrStop, headOrFeet, direction) {
    var bedControlObject = {
      startOrStop: startOrStop,
      headOrFeet: headOrFeet,
      direction: direction
    }
    this.postData(SmartBedUrler.bedControl, JSON.stringify(bedControlObject));
  }

  fetchData(url) {
      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          throw new Error('Uventet feil');
        })
        .then((responseJson) => {
          console.log(responseJson);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  postData(url, bedControlObject) {
    fetch(url, {
      method: 'POST',
      body: bedControlObject,
      headers: {"Content-Type": "application/json"}
    })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Uventet feil');
    })
    .then((responseJson) => {
      console.log(responseJson);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    if (this.state.alarmButtonPressed) {
      return (
        <LoadingView loading={this.props.loading}>
          <View style={styles.container}>
            <View style={{flex: 1}}>
              <Text style={{marginTop: 35, fontSize: 18, fontWeight: 'bold'}}>Smart Bed</Text>
            </View>
            <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
              <TimePicker
                selectedHours={this.state.selectedHours}
                selectedMinutes={this.state.selectedMinutes}
                onChange={(hours, minutes) => this.setState({ selectedHours: hours, selectedMinutes: minutes })}
              />
            </View>

            <View style={{flex: 1}}>
              <Button
                style={{flex: 1, backgroundColor: 'skyblue', marginHorizontal: 8, width: '80%'}}
                textStyle={{ fontSize: 18 }}
                isDisabled={this.props.loading}
                onPress={() => {
                  this.setState({alarmButtonPressed: !this.state.alarmButtonPressed, alarmSet: true});
                  this.alarmControl()
                }}
              >
                <Icon
                  name="bullhorn"
                  size={26}
                  style={[styles.icon, { color: '#FFFFFF' }]}
                />
                {this.props.t('bedControl:setAlarm')}
              </Button>
            </View>
          </View>
        </LoadingView>
    );}
    else {
      return (
        <LoadingView loading={this.props.loading}>
          <View style={styles.container}>
            <View style={{flex: 1}}>
              <Text style={{marginTop: 35, fontSize: 18, fontWeight: 'bold'}}>Smart Bed</Text>
            </View>

            <View style={{flex: 1, flexDirection: 'row'}}>
              <CustomClickButton
                iconName="lightbulb-o"
                buttonText={this.props.t('bedControl:lightOn')}
                onPressButton={() => {this.lightControl(true, null)}}
                iconColor='#FFFFFF'/>
              <CustomClickButton
                iconName="lightbulb-o"
                buttonText={this.props.t('bedControl:lightOff')}
                onPressButton={() => {this.lightControl(false, null)}}
                iconColor='#000000'/>
            </View>

            <View style={{flex: 1, flexDirection: 'row'}}>
              <CustomClickButton
                iconName="lightbulb-o"
                buttonText={this.props.t('bedControl:ledOn')}
                onPressButton={() => {this.ledControl(true)}}
                iconColor='#FFFFFF'/>
              <CustomClickButton
                iconName="lightbulb-o"
                buttonText={this.props.t('bedControl:ledOff')}
                onPressButton={() => {this.ledControl(false)}}
                iconColor='#000000'/>
            </View>

            <View style={{flex: 1, flexDirection: 'row'}}>
              <CustomClickButton
                iconName="thermometer-4"
                buttonText={this.props.t('bedControl:heatOn')}
                onPressButton={() => {this.heatControl(true)}}
                iconColor='#FFFFFF'/>
              <CustomClickButton
                iconName="thermometer-empty"
                buttonText={this.props.t('bedControl:heatOff')}
                onPressButton={() => {this.heatControl(false)}}
                iconColor='#000000'/>
            </View>

            <View style={{flex: 1, flexDirection: 'row'}}>
              <CustomHoldButton
                iconName="chevron-up"
                buttonText={this.props.t('bedControl:headUp')}
                onPressInButton={() => {this.bedControl('start', 'head', 'up')}}
                onPressOutButton={() => {this.bedControl('stop', 'head', 'up')}}
                iconColor='#FFFFFF'/>
              <CustomHoldButton
                iconName="chevron-up"
                buttonText={this.props.t('bedControl:feetUp')}
                onPressInButton={() => {this.bedControl('start', 'feet', 'up')}}
                onPressOutButton={() => {this.bedControl('stop', 'feet', 'up')}}
                iconColor='#FFFFFF'/>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <CustomHoldButton
                iconName="chevron-down"
                buttonText={this.props.t('bedControl:headDown')}
                onPressInButton={() => {this.bedControl('start', 'head', 'down')}}
                onPressOutButton={() => {this.bedControl('stop', 'head', 'down')}}
                iconColor='#FFFFFF'/>
              <CustomHoldButton
                iconName="chevron-down"
                buttonText={this.props.t('bedControl:feetDown')}
                onPressInButton={() => {this.bedControl('start', 'feet', 'down')}}
                onPressOutButton={() => {this.bedControl('stop', 'feet', 'down')}}
                iconColor='#FFFFFF'/>
            </View>



            {/* <View style={{flex: 0.5, flexDirection: 'column', justifyContent: 'center', width: '100%'}}>
              <Text style={{fontSize: 20, textAlign: 'center'}}>
                {"Sengevinkel på hodet: " + String(this.state.bedAngleHeadValue)}</Text>
              <Slider
                step={1}
                maximumValue={45}
                onValueChange={this.changeBedAngleHeadValue.bind(this)}
                onSlidingComplete={this.slidingBedAngleHeadComplete.bind(this)}
                value={this.state.bedAngleHeadValue}
              />
            </View>
            <View style={{flex: 0.5, flexDirection: 'column', justifyContent: 'center', width: '100%'}}>
              <Text style={{fontSize: 20, textAlign: 'center'}}>
                {"Sengevinkel på bena: " + String(this.state.bedAngleFeetValue)}</Text>
              <Slider
                step={1}
                maximumValue={45}
                onValueChange={this.changeBedAngleFeetValue.bind(this)}
                onSlidingComplete={this.slidingBedAngleFeetComplete.bind(this)}
                value={this.state.bedAngleFeetValue}
              />
            </View> */}

            <View style={{flex: 1}}>
              <Button
                style={this.state.alarmSet ? {flex: 1, backgroundColor: 'skyblue', marginHorizontal: 8, width: '80%'} : {flex: 1, backgroundColor: 'skyblue', marginHorizontal: 8, width: '80%'}}
                textStyle={{ fontSize: 18 }}
                isDisabled={this.props.loading}
                onPress={() => {
                  if (this.state.alarmSet) {
                    this.setState({alarmSet: false});
                    this.alarmControl();
                  }
                  else {
                    this.setState({alarmButtonPressed: !this.state.alarmButtonPressed});
                  }
                }}
              >
                <Icon
                  name="bullhorn"
                  size={26}
                  style={[styles.icon, {color: 'white'}]}
                />
                {!this.state.alarmSet ? this.props.t('bedControl:setAlarm') : this.props.t('bedControl:disableAlarm') + "\n" + this.state.selectedHours + ":" + this.state.selectedMinutes}
              </Button>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Button
                style={{flex: 1, backgroundColor: 'skyblue', marginHorizontal: 3}}
                textStyle={{ fontSize: 18 }}
                isDisabled={this.props.loading}
                onPress={() => {
                  this.scemeControl("sleep");
                }}
              >
                <Icon
                  name="lightbulb-o"
                  size={26}
                  style={[styles.icon, { color: '#FFFFFF' }]}
                />
                {this.props.t('bedControl:sleep')}
              </Button>
              <Button
                style={{flex: 1, backgroundColor: 'skyblue', marginHorizontal: 3}}
                textStyle={{ fontSize: 18 }}
                isDisabled={this.props.loading}
                onPress={() => {
                  this.scemeControl("wakethefuckup");
                }}
              >
                <Icon
                  name="lightbulb-o"
                  size={26}
                  style={[styles.icon, { color: '#000000' }]}
                />
                {this.props.t('bedControl:wakethefuckup')}
              </Button>
            </View>

          </View>
        </LoadingView>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.loading,
    networkEnabled: state.networkEnabled.networkEnabled
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
    dispatchStartLoading: () => dispatch(startLoading()),
    dispatchStopLoading: () => dispatch(stopLoading())
  };
}

export default translate()(
  connect(mapStateToProps, mapDispatchToProps)(BedControlPage)
);
