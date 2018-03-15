// @flow

const React = require('react-native');

const { StyleSheet } = React;
const grayButton = '#E9E9E9';
const white = '#FFFFFF';
const fontColor = '#4D4C4D';

module.exports = StyleSheet.create({
  loginNavigationHeader: {
    backgroundColor: fontColor
  },
  icon: {
    padding: 1,
    width: 26,
    height: 26
  },
  tabBar: {
    backgroundColor: fontColor,
    height: 60
  },
  firstPageTextView: {
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: white
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: white,
    flexDirection: 'column'
  }
});
