/*
 *     FRAMEWORK
 */
import React from 'react';
/*
 *     NAVIGATION
 */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
/*
 *     COMPONENTS
 */
import {ListScreen} from '../screens/ListScreen';
import {DetailsScreen} from '../screens/DetailsScreen';
import {ResetButton} from '../components/buttons/ResetButton';
import {ThemeChangeButton} from '../components/buttons/ThemeChangeButton';

/*
 *     STYLING
 */
import {commonColors} from '../utils/theme';

type StackParamList = {
  ListScreen: undefined;
  Details: {characterId: string; isSuccess: boolean};
};

const Stack = createNativeStackNavigator<StackParamList>();

export const ListStack = (): React.ReactElement => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListScreen"
        component={ListScreen}
        options={() => ({
          title: 'List',
          headerRight: () => <ResetButton />,
          headerLeft: () => <ThemeChangeButton />,
          headerStyle: {
            backgroundColor: commonColors.primaryBackground,
          },
          headerTintColor: commonColors.white,
        })}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={() => ({
          title: 'Details',
          tabBarStyle: {display: 'none'},
          headerStyle: {
            backgroundColor: commonColors.primaryBackground,
          },
          headerTitleAlign: 'center',
          headerTintColor: commonColors.white,
        })}
      />
    </Stack.Navigator>
  );
};
