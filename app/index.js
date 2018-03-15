// @flow

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import AppNavigation from './AppNavigation';
import configureStore from '../configureStore';
import i18n from './locales/i18n';

const store = configureStore();

class SmartBedAriotReactNative extends Component<{}> {
  codePushDownloadDidProgress(progress) {}

  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <AppNavigation />
        </Provider>
      </I18nextProvider>
    );
  }
}

AppRegistry.registerComponent(
  'SmartBedAriotReactNative',
  () => SmartBedAriotReactNative
);
