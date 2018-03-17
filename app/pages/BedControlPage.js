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

  changeBedAngleHeadValue(value) {
    this.setState(() => {
      return {
        bedAngleHeadValue: parseFloat(value),
      };
    });
  }

  changeBedAngleFeetValue(value) {
    this.setState(() => {
      return {
        bedAngleFeetValue: parseFloat(value),
      };
    });
  }

  slidingBedAngleHeadComplete(value) {
    this.bedAngleHeadControl(value);
  }

  slidingBedAngleFeetComplete(value) {
    this.bedAngleFeetControl(value);
  }

  fetchData() {}

  lightControl(on, dimValue) {
    var requestUrl = "";
    if (on !== null) {
      if (on) {
        requestUrl = SmartBedUrler.toggleLightOn;
      }
      else {
        requestUrl = SmartBedUrler.toggleLightOff;
      }
    }
    else {
      requestUrl = SmartBedUrler.dimLight + String(dimValue)
    }
    fetch(requestUrl)
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

  bedAngleHeadControl(value) {
    fetch(SmartBedUrler.setHeadAngle + String(value))
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

  bedAngleFeetControl(value) {
    fetch(SmartBedUrler.setFeetAngle + String(value))
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

  heatControl(on) {
    fetch(on ? SmartBedUrler.toggleHeatOn : SmartBedUrler.toggleHeatOff)
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

            <View style={{flexDirection: 'row'}}>
              <Button
                style={{flex: 1, backgroundColor: 'skyblue', marginHorizontal: 3}}
                textStyle={{ fontSize: 18 }}
                isDisabled={this.props.loading}
                onPress={() => {
                  this.lightControl(true, null);
                }}
              >
                <Icon
                  name="lightbulb-o"
                  size={26}
                  style={[styles.icon, { color: '#FFFFFF' }]}
                />
                {this.props.t('bedControl:lightOn')}
              </Button>
              <Button
                style={{flex: 1, backgroundColor: 'skyblue', marginHorizontal: 3}}
                textStyle={{ fontSize: 18 }}
                isDisabled={this.props.loading}
                onPress={() => {
                  this.lightControl(false, null);
                }}
              >
                <Icon
                  name="lightbulb-o"
                  size={26}
                  style={[styles.icon, { color: '#000000' }]}
                />
                {this.props.t('bedControl:lightOff')}
              </Button>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Button
                style={{flex: 1, backgroundColor: 'skyblue', marginHorizontal: 3}}
                textStyle={{ fontSize: 18 }}
                isDisabled={this.props.loading}
                onPress={() => {
                  this.heatControl(true);
                }}
              >
                <Icon
                  name="thermometer-4"
                  size={26}
                  style={[styles.icon, { color: '#FFFFFF' }]}
                />
                {this.props.t('bedControl:heatOn')}
              </Button>
              <Button
                style={{flex: 1, backgroundColor: 'skyblue', marginHorizontal: 3}}
                textStyle={{ fontSize: 18 }}
                isDisabled={this.props.loading}
                onPress={() => {
                  this.heatControl(false);
                }}
              >
                <Icon
                  name="thermometer-empty"
                  size={26}
                  style={[styles.icon, { color: '#000000' }]}
                />
                {this.props.t('bedControl:heatOff')}
              </Button>
            </View>

            <View style={{flex: 0.5, flexDirection: 'column', justifyContent: 'center', width: '100%'}}>
              <Text style={{fontSize: 20, textAlign: 'center'}}>
                {"Dim light: " + String(this.state.dimValue)}</Text>
              <Slider
                step={1}
                maximumValue={100}
                onValueChange={this.changeDimValue.bind(this)}
                onSlidingComplete={this.slidingLightComplete.bind(this)}
                value={this.state.dimValue}
              />
            </View>

            <View style={{flex: 0.5, flexDirection: 'column', justifyContent: 'center', width: '100%'}}>
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
            </View>

            <View style={{flex: 1}}>
              <Button
                style={this.state.alarmSet ? {flex: 1, backgroundColor: 'red', marginHorizontal: 8, width: '80%'} : {flex: 1, backgroundColor: 'blue', marginHorizontal: 8, width: '80%'}}
                textStyle={{ fontSize: 18 }}
                isDisabled={this.props.loading}
                onPress={() => {
                  if (this.state.alarmSet) {
                    this.setState({alarmSet: false});
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
