// @flow

import React, { Component } from 'react';
import { View, Text, Slider, Alert, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoadingView from 'react-native-loading-view';
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
  dimValue: number
}

class BedControlPage extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      dimValue: 50,
    };
  }

  changeDimValue(value) {
    this.setState(() => {
      return {
        dimValue: parseFloat(value),
      };
    });
  }

  slidingComplete(value) {
    this.lightControl(null, value);
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

  render() {
    return (
      <LoadingView loading={this.props.loading}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <Text style={{marginTop: 25, fontSize: 18, fontWeight: 'bold'}}>Smart Bed</Text>
          </View>
          {/* <Button style={{backgroundColor: 'red'}} textStyle={{fontSize: 18}}>
            Hello!
          </Button> */}
          <View style={{flexDirection: 'row'}}>
            <Button
              style={{flex: 1, backgroundColor: 'red', marginHorizontal: 3}}
              textStyle={{ fontSize: 18 }}
              isDisabled={this.props.loading}
              onPress={() => {
                this.lightControl(true, null);
              }}
            >
              <Icon
                name="lightbulb-o"
                size={26}
                style={[styles.icon, { color: '#000000' }]}
              />
              {this.props.t('bedControl:lightOn')}
            </Button>
            <Button
              style={{flex: 1, backgroundColor: 'red', marginHorizontal: 3}}
              textStyle={{ fontSize: 18 }}
              isDisabled={this.props.loading}
              onPress={() => {
                this.lightControl(false, null);
              }}
            >
              <Icon
                name="registered"
                size={26}
                style={[styles.icon, { color: '#000000' }]}
              />
              {this.props.t('bedControl:lightOff')}
            </Button>
          </View>

          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', width: '100%'}}>
            <Text style={{fontSize: 20, textAlign: 'center'}}>
              {"Dim light: " + String(this.state.dimValue)}</Text>
            <Slider
              step={1}
              maximumValue={100}
              onValueChange={this.changeDimValue.bind(this)}
              onSlidingComplete={this.slidingComplete.bind(this)}
              value={this.state.dimValue}
            />
          </View>
        </View>
      </LoadingView>
    );
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
