// @flow

import { SET_NETWORK_ENABLED } from '../../constants';
import type { networkEnabledAction } from '../../types';

type State = {
  networkEnabled: boolean
};

const initialState = { networkEnabled: false };

export default function loadingReducer(
  state: State = initialState,
  action: networkEnabledAction
): State {
  switch (action.type) {
    case SET_NETWORK_ENABLED:
      return {
        networkEnabled: action.networkEnabled
      };
    default:
      return state;
  }
}
