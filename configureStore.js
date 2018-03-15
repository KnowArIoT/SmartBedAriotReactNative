// @flow
'use strict';

import { createStore, applyMiddleware } from 'redux'
import rootReducer from './app/reducers'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';


export default function configureStore() {
  let store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        logger
      )
    )
  );
  return store
}
