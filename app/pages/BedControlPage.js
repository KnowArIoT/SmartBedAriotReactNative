// @flow

import React, { Component } from 'react';
import { View, Text, Alert, AsyncStorage } from 'react-native';
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

class BedControlPage extends Component<Props> {
  componentDidMount() {
    // if (this.props.networkEnabled) {
    //   this.props.dispatchStartLoading();
    //   this.fetchData();
    // }
      
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
        Alert.alert("Noe gikk galt", error.message)
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
          <Button
            style={{flex: 1, backgroundColor: 'red'}}
            textStyle={{ fontSize: 18 }}
            isDisabled={this.props.loading}
            onPress={() => {
              this.toggleLight();
            }}
          >
            <Icon
              name="lightbulb-o"
              size={26}
              style={[styles.icon, { color: '#000000' }]}
            />
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
