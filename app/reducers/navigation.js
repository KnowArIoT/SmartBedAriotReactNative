// @flow

import React from 'react';
import * as ReactNavigation from 'react-navigation';
import { connect } from 'react-redux';
import AppNavigation from '../AppNavigation';

type State = {
  dispatch: Object,
  nav: Object
};

function ReduxNavigation(state: State) {
  const { dispatch, nav } = state;
  const navigation = ReactNavigation.addNavigationHelpers({
    dispatch,
    state: nav
  });

  return <AppNavigation navigation={navigation} />;
}

function mapStateToProps(state: State): Object {
  return {
    nav: state.nav
  };
}
export default connect(mapStateToProps)(ReduxNavigation);
