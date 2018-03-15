// @flow

import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import LoadingView from 'react-native-loading-view';
import { startLoading, stopLoading } from '../../actions';
import { SHOULD_MOCK } from '../../constants';
import {} from '../util/RequestHelper';

const styles = require('./../styles');

const mockData: Array<Lock> = {};

type Props = {
  navigation: Object,
  loading: boolean,
  networkEnabled: boolean,
  dispatchStartLoading: () => void,
  dispatchStopLoading: () => void
};

class BedControlPage extends Component<Props> {
  componentDidMount() {
    if (this.props.networkEnabled) {
      this.props.dispatchStartLoading();
      this.fetchData();
    }
  }

  fetchData() {}

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
  connect(mapStateToProps, mapDispatchToProps)(BedControlPage)
);
