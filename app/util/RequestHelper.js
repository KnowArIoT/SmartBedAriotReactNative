// @flow

import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

export function generateDefaultRequestHeaders(accessToken: string) {
  return { headers: { Authorization: `Bearer ${accessToken}` } };
}

// const baseUrl = 'http://35.187.83.210';
const baseUrl = 'http://ariot.knowit.no/';

export const SmartBedUrler = {
  toggleLightOn: `${baseUrl}/toggleLightOn`,
  toggleLightOff: `${baseUrl}/toggleLightOff`,
  dimLight: `${baseUrl}/dimLight/`,
  headUp: `${baseUrl}/headup`,
  sendControl: `${baseUrl}/something`,
  getStat: `${baseUrl}/esomethingElse`
};
