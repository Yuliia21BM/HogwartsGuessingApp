/*
 *     FRAMEWORK
 */
import React from 'react';
/*
 *     COMPONENTS
 */
import {StyleSheet, View, TextStyle} from 'react-native';
import {Icon, Text} from 'react-native-paper';

interface ObfuscatedTextWithIconProps {
  value: string;
  isHidden: boolean;
  textStyles?: TextStyle | TextStyle[];
}

export const ObfuscatedTextWithIcon: React.FC<ObfuscatedTextWithIconProps> = ({
  value,
  isHidden,
  textStyles,
}) => {
  return isHidden ? (
    <View style={styles.iconContainer}>
      <Icon source="lock" size={24} color="gray" />
    </View>
  ) : (
    <Text style={textStyles}>{value}</Text>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    paddingHorizontal: 5,
  },
});
