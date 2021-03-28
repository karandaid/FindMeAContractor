/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import {theme} from './src/utils/evaTheme';
console.log({light: eva.light, theme});
const RNApp = () => (
  <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
    <App />
  </ApplicationProvider>
);

AppRegistry.registerComponent(appName, () => RNApp);
