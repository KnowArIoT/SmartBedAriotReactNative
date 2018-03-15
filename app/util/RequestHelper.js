// @flow

import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

export function generateDefaultRequestHeaders(accessToken: string) {
  return { headers: { Authorization: `Bearer ${accessToken}` } };
}

const baseUrl = 'https://heyheyhey';

export const SmartBedUrler = {
  toggleLight: `${baseUrl}/toggleLight`,
  headUp: `${baseUrl}/headup`,
  sendControl: `${baseUrl}/something`,
  getStat: `${baseUrl}/esomethingElse`
};
