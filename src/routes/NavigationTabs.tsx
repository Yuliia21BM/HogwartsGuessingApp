/*
 *     FRAMEWORK
 */
import React from 'react';
/*
 *     STATE
 */
import {useReduxSelector} from '../redux/store';
import {selectIsThemeDark} from '../redux/common/commonSelectors';
/*
 *     NAVIGATION
 */
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
/*
 *     STYLING
 */
import {Provider as PaperProvider} from 'react-native-paper';
import {lightTheme, darkTheme} from '../utils/theme';
/*
 *     COMPONENTS
 */
import {ListStack} from './ListStack';
import {HomeScreen} from '../screens/HomeScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ResetButton} from '../components/buttons/ResetButton';
import {ThemeChangeButton} from '../components/buttons/ThemeChangeButton';
import {View} from 'react-native';
/*
 *     STYLING
 */
import {commonColors} from '../utils/theme';

type StackParamList = {
  Home: {id?: string};
  List: undefined;
};

const Tab = createBottomTabNavigator<StackParamList>();

export const NavigationTabs = (): React.ReactElement => {
  const isDarkTheme = useReduxSelector(selectIsThemeDark);

  return (
    <PaperProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({color, size}) => {
              let iconName = 'home';

              if (route.name === 'Home') {
                iconName = 'deathly-hallows';
              } else if (route.name === 'List') {
                iconName = 'sort-reverse-variant';
              }

              return (
                <MaterialCommunityIcons
                  name={iconName}
                  color={color}
                  size={size}
                />
              );
            },
            tabBarStyle: {
              backgroundColor: commonColors.primaryBackground,
            },
            tabBarActiveTintColor: commonColors.white,
            tabBarInactiveTintColor: commonColors.gray,
            headerStyle: {
              backgroundColor: commonColors.primaryBackground,
            },
            headerTitleAlign: 'center',
            headerTintColor: commonColors.white,
            headerLeft: () => <ThemeChangeButton style={{paddingLeft: 15}} />,
          })}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            initialParams={{id: undefined}}
            options={() => ({
              title: 'Home',
              headerRight: () => (
                <View style={{paddingRight: 10}}>
                  <ResetButton />
                </View>
              ),
            })}
          />
          <Tab.Screen
            name="List"
            component={ListStack}
            options={{
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};
