// @flow

import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import LoadingView from 'react-native-loading-view';
import { startLoading, stopLoading } from '../../actions';
import { SHOULD_MOCK } from '../../constants';
import { SmartBedUrler } from '../util/RequestHelper';


const styles = require('./../styles');

type Props = {
  navigation: Object,
  loading: boolean,
  networkEnabled: boolean,
  dispatchStartLoading: () => void,
  dispatchStopLoading: () => void
};

type State = {
  sensorData: Array<Object>
}

class DashboardPage extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      sensorData: []
    }
  }

  componentDidMount() {
    this.props.dispatchStartLoading();
    this.fetchData();
  }

  fetchData() {
    fetch(SmartBedUrler.getSensorData)
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
      this.props.dispatchStopLoading();
  }

  render() {
    return (
      <LoadingView loading={this.props.loading}>
        <View style={styles.container} />
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
  connect(mapStateToProps, mapDispatchToProps)(DashboardPage)
);
