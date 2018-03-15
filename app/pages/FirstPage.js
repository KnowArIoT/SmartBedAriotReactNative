// @flow

import React, { Component } from 'react';
import { View } from 'react-native';

import Button from 'apsl-react-native-button';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import Permissions from 'react-native-permissions';
import {} from '../../actions';
import { SHOULD_MOCK, MOCKNETWORKENABLED } from '../../constants';

const styles = require('./../styles');

type State = {
  buttonPressed: boolean
};

type Props = {
  navigation: Object,
  t: Function
};

class FirstPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      buttonPressed: false
    };
  }

  componentDidMount() {}

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleConnectionChange
    );
  }

  logInIfAuthorized() {}

  checkNetworkEnabled() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.props.dispatchSetNetworkEnabled(isConnected);
      NetInfo.isConnected.addEventListener(
        'connectionChange',
        this._handleConnectionChange
      );
      if (isConnected && !this.props.unauthenticated && !SHOULD_MOCK) {
        this.logInIfAuthorized();
      }
    });
  }

  _handleConnectionChange = isConnected => {
    this.props.dispatchSetNetworkEnabled(isConnected);
    if (isConnected && !this.props.unauthenticated && !SHOULD_MOCK) {
      this.logInIfAuthorized();
    }
  };

  render() {
    const { t } = this.props;

    return <View style={styles.firstPageTextView} />;
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch: Function) {
  return {};
}

export default translate()(
  connect(mapStateToProps, mapDispatchToProps)(FirstPage)
);
