// @flow

import { combineReducers } from 'redux';
import loading from './loading';
import networkEnabled from './networkEnabled';

const rootReducer = combineReducers({
  loading,
  networkEnabled
});

export default rootReducer;
