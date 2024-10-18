/*
 *     FRAMEWORK
 */
import React from 'react';
/*
 *     STATE
 */
import {useReduxDispatch, useReduxSelector} from '../../redux/store';
import {selectIsThemeDark} from '../../redux/common/commonSelectors';
import {toggleTheme} from '../../redux/common/commonSlice';
/*
 *     COMPONENTS
 */
import {IconButton} from 'react-native-paper';
import {StyleProp, ViewStyle} from 'react-native';

type ThemeChangeButtonProps = {
  style?: StyleProp<ViewStyle>;
};

export const ThemeChangeButton = ({
  style,
}: ThemeChangeButtonProps): React.ReactElement => {
  const dispatch = useReduxDispatch();
  const isDarkTheme = useReduxSelector(selectIsThemeDark);

  const toggleThemeMode = () => {
    dispatch(toggleTheme());
  };
  return (
    <IconButton
      icon={isDarkTheme ? 'white-balance-sunny' : 'weather-night-partly-cloudy'}
      iconColor="white"
      size={24}
      onPress={toggleThemeMode}
      style={style}
    />
  );
};
