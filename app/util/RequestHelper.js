// @flow

import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

export function generateDefaultRequestHeaders(accessToken: string) {
  return { headers: { Authorization: `Bearer ${accessToken}` } };
}

// const baseUrl = 'http://35.187.83.210';
// const baseUrl = 'http://ariot.knowit.no';
const baseUrl = 'http://smartbeddypi.local:8080';
const remoteUrl = 'http://ariot.knowit.no';

export const SmartBedUrler = {
  toggleLightOn: `${baseUrl}/toggleLightOn`,
  toggleLightOff: `${baseUrl}/toggleLightOff`,
  toggleLedOn: `${baseUrl}/toggleLedOn`,
  toggleLedOff: `${baseUrl}/toggleLedOff`,
  toggleHeatOn: `${baseUrl}/toggleHeatOn`,
  toggleHeatOff: `${baseUrl}/toggleHeatOff`,
  dimLight: `${baseUrl}/dimLight/`,
  getSensorData: `${remoteUrl}/sensorData/7`,
  setAlarm: `${baseUrl}/setAlarm`,
  wakeup: `${baseUrl}/scene/wakeup`,
  sleep: `${baseUrl}/scene/sleep`,
  bedControl: `${baseUrl}/bed`,
};
