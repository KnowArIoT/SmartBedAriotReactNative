// @flow

import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import FirstPage from './pages/FirstPage';
import DashboardPage from './pages/DashboardPage';
import BedControlPage from './pages/BedControlPage';

const styles = require('./styles');

const LoginStack = StackNavigator(
  {
    FirstPage: { screen: FirstPage }
  },
  {
    headerMode: 'float',
    navigationOptions: {
      headerStyle: styles.loginNavigationHeader,
      title: 'Logg inn',
      headerTintColor: 'white'
    }
  }
);

const BedControlTab = StackNavigator({
  Remote: {
    screen: BedControlPage,
    navigationOptions: () => ({
      gesturesEnabled: false,
      header: null
    })
  }
});

const DashboardTab = StackNavigator({
  Remote: {
    screen: DashboardPage,
    navigationOptions: () => ({
      gesturesEnabled: false,
      header: null
    })
  }
});

function bedControlIcon({ tintColor }) {
  return (
    <Icon name="cogs" size={24} style={[styles.icon, { color: tintColor }]} />
  );
}

function dashboardIcon({ tintColor }) {
  return (
    <Icon
      name="heartbeat"
      size={24}
      style={[styles.icon, { color: tintColor }]}
    />
  );
}

const TabStack = TabNavigator(
  {
    BedControl: {
      screen: BedControlTab,
      navigationOptions: {
        tabBarIcon: bedControlIcon,
        tabBarLabel: 'Bed control'
      }
    },
    Dash: {
      screen: DashboardTab,
      navigationOptions: {
        tabBarIcon: dashboardIcon,
        tabBarLabel: 'Dashboard'
      }
    }
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      showIcon: 'true',
      activeTintColor: 'white',
      inactiveTintColor: '#a3a3a3',
      style: styles.tabBar
    }
  }
);

const PrimaryNav = StackNavigator(
  {
    loginStack: { screen: LoginStack },
    tabStack: { screen: TabStack }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    title: 'Oslo kommune',
    initialRouteName: 'tabStack'
  }
);

export default PrimaryNav;
