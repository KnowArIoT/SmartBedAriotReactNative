// @flow

import React, { Component } from 'react';
import { View, Text, Alert, AsyncStorage, StyleSheet } from 'react-native';
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

class BedControlPage extends Component<Props> {
  componentDidMount() {
  }

  fetchData() {}

  toggleLight() {
    fetch(SmartBedUrler.toggleLight)
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
          <Button
            style={{flex: 1, backgroundColor: 'red'}}
            textStyle={{ fontSize: 18 }}
            isDisabled={this.props.loading}
            onPress={() => {
              this.toggleLight();
            }}
          >
            {this.props.t('bedControl:toggleLight')}
          </Button>
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
