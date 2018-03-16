// @flow

import React, { Component } from 'react';
import { View, Text, Slider, Alert, AsyncStorage, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Button from 'apsl-react-native-button';
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
        Alert.alert("Noe gikk galt", error.message);
        console.log(error);
      });
  }

  headUp() {
    fetch(SmartBedUrler.headUp)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('headup feil');
        })
        .then((responseJson) => {
            console.log(responseJson);
        })
        .catch((error) => {
            Alert.alert("Noe gikk galt", error.message);
            console.log(error);
        });
  }

  headDown() {

  }

  feetUp() {

  }

  feetDown() {

  }

  render() {

      const buttonStyle = StyleSheet.create({
          container: {
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
          },
          buttonContainer: {
              flex: 1,
          }
      });

    return (
      <LoadingView loading={this.props.loading}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <Text style={{marginTop: 25, fontSize: 18, fontWeight: 'bold'}}>Smart Bed</Text>
          </View>

            {/* head movement */ }
            <View style={buttonStyle.container}>
                <View style={buttonStyle.buttonContainer}>
                    <Button
                        textStyle={{ fontSize: 18 }}
                        isDisabled={this.props.loading}
                        onPress={() => {
                            this.headUp();
                        }}
                    >Head up</Button>
                </View>
                <View style={buttonStyle.buttonContainer}>
                    <Button
                        textStyle={{ fontSize: 18 }}
                        isDisabled={this.props.loading}
                        onPress={() => {
                            this.headDown();
                        }}
                    >Head down</Button>
                </View>
            </View>

            {/* feet movement */}
            <View style={buttonStyle.container}>
                <View style={buttonStyle.buttonContainer}>
                    <Button
                        textStyle={{ fontSize: 18 }}
                        isDisabled={this.props.loading}
                        onPress={() => {
                            this.feetUp();
                        }}
                    >Feet up</Button>
                </View>
                <View style={buttonStyle.buttonContainer}>
                    <Button
                        textStyle={{ fontSize: 18 }}
                        isDisabled={this.props.loading}
                        onPress={() => {
                            this.feetDown();
                        }}
                    >Feet down</Button>
                </View>
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

            {this.props.t('bedControl:lightOn')}
          </Button><Button
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
