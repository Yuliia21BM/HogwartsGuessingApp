import {DefaultTheme, MD3DarkTheme, useTheme} from 'react-native-paper';

export const commonColors = {
  white: '#ffffff',
  gold: '#d4af37',
  primaryBackground: '#2C2C2C',
  gray: '#808080',
};

const homesColors = {
  gryffindor: '#740001',
  slytherin: '#2A623D',
  ravenclaw: '#0E1A40',
  hufflepuff: '#FFDB58',
};

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    primary: '#6200EE',
    accent: '#03DAC6',
    text: '#000000',
    cardBackground: '#F0F0F0',
    // cardBackground: '#D4AF37',
    buttonBackgrounds: homesColors,
    ...commonColors,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: '#1C1C1C',
    primary: '#BB86FC',
    accent: '#03DAC6',
    text: '#FFFFFF',
    cardBackground: '#333333',
    // cardBackground: '#D4AF37',
    buttonBackgrounds: homesColors,
    ...commonColors,
  },
};

export type AppTheme = typeof lightTheme;

export const useAppTheme = () => useTheme<AppTheme>();
