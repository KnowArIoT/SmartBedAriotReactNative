// @flow
'use strict';

import {START_LOADING, STOP_LOADING, SET_NETWORK_ENABLED } from './constants';

export function startLoading() {
  return {
    type: START_LOADING,
  };
}

export function stopLoading() {
  return {
    type: STOP_LOADING,
  };
}

export function setNetworkEnabled(networkEnabled: boolean) {
  return {
    type: SET_NETWORK_ENABLED,
    networkEnabled: networkEnabled,
  }
}
