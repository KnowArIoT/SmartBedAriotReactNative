// @flow

import { START_LOADING, STOP_LOADING } from '../../constants';
import type { defaultAction } from '../../types';

type State = {
  loading: boolean
};

const initialState = { loading: false };

export default function loadingReducer(
  state: State = initialState,
  action: defaultAction
): State {
  switch (action.type) {
    case START_LOADING:
      return {
        loading: true
      };
    case STOP_LOADING:
      return {
        loading: false
      };
    default:
      return state;
  }
}
