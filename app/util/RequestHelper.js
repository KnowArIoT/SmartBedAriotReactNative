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
  toggleHeatOn: `${baseUrl}/toggleHeatOn`,
  toggleHeatOff: `${baseUrl}/toggleHeatOff`,
  dimLight: `${baseUrl}/dimLight/`,
  setHeadAngle: `${baseUrl}/setHeadAngle/`,
  setFeetAngle: `${baseUrl}/setFeetAngle/`,
  getSensorData: `${baseUrl}/api/sensorData/7`,
  setAlarm: `${baseUrl}/setAlarm/`
};
