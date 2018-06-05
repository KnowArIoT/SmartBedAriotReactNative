// @flow

import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

export function generateDefaultRequestHeaders(accessToken: string) {
  return { headers: { Authorization: `Bearer ${accessToken}` } };
}

const baseUrl = 'http://35.187.83.210';
// const baseUrl = 'http://ariot.knowit.no';

export const SmartBedUrler = {
  toggleLightOn: `${baseUrl}/toggleLightOn`,
  toggleLightOff: `${baseUrl}/toggleLightOff`,
  toggleLedOn: `${baseUrl}/toggleLedOn`,
  toggleLedOff: `${baseUrl}/toggleLedOff`,
  toggleHeatOn: `${baseUrl}/toggleHeatOn`,
  toggleHeatOff: `${baseUrl}/toggleHeatOff`,
  dimLight: `${baseUrl}/dimLight/`,
  getSensorData: `${baseUrl}/sensorData`,
  setAlarm: `${baseUrl}/scene/wakeup`,
  wakeup: `${baseUrl}/scene/wakeup`,
  sleep: `${baseUrl}/scene/sleep`,
  bedControl: `${baseUrl}/bed`,
};
