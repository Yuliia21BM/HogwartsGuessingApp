/*
 *     FRAMEWORK
 */
import React from 'react';
/*
 *     STATE
 */
import {useReduxSelector} from '../../redux/store';
import {selectIsThemeDark} from '../../redux/common/commonSelectors';
/*
 *     COMPONENTS
 */
import {View, StyleSheet, Image} from 'react-native';
import {Text, TouchableRipple} from 'react-native-paper';
import {houseImageMap} from '../../utils';
/*
 *     STYLING
 */
import {useAppTheme} from '../../utils/theme';

export type HouseButtonProps = {
  house: 'Gryffindor' | 'Slytherin' | 'Ravenclaw' | 'Hufflepuff' | 'notInHouse';
  onButtonPress: (house: HouseButtonProps['house']) => void;
};

const houseKeyMap: Record<
  string,
  'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff'
> = {
  Gryffindor: 'gryffindor',
  Slytherin: 'slytherin',
  Ravenclaw: 'ravenclaw',
  Hufflepuff: 'hufflepuff',
};

export const HouseButton = ({
  house,
  onButtonPress,
}: HouseButtonProps): React.ReactElement => {
  const {colors} = useAppTheme();
  const isDarkTheme = useReduxSelector(selectIsThemeDark);

  const backgroundColor = isDarkTheme
    ? colors.buttonBackgrounds[houseKeyMap[house]]
    : 'transparent';

  return (
    <TouchableRipple
      onPress={() => onButtonPress(house)}
      style={[styles.houseButton, {backgroundColor}]}>
      <View style={styles.houseButtonContainer}>
        <Image source={houseImageMap[house]} style={styles.houseImage} />
        <Text style={[styles.houseText, {color: colors.text}]}>{house}</Text>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  houseButton: {
    width: '45%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.3,
    borderColor: '#ccc',
    borderRadius: 20,
  },
  houseButtonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  houseImage: {
    width: 70,
    height: 70,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  houseText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
