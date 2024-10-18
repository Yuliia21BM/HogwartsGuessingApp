/*
 *     FRAMEWORK
 */
import React from 'react';
/*
 *     STATE
 */
import {Provider} from 'react-redux';
import store from './src/redux/store';
/*
 *     COMPONENTS
 */
import {NavigationTabs} from './src/routes/NavigationTabs';
import 'react-native-gesture-handler';

export default function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <NavigationTabs />
    </Provider>
  );
}
