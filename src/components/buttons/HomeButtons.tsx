/*
 *     FRAMEWORK
 */
import React from 'react';
/*
 *     STATE
 */
import {useReduxDispatch} from '../../redux/store';
/*
 *     COMPONENTS
 */
import {View, StyleSheet, Image} from 'react-native';
import {Text, TouchableRipple} from 'react-native-paper';
import {HouseButton, HouseButtonProps} from './HouseButton';
/*
 *     STYLING
 */
import {useAppTheme} from '../../utils/theme';

type HomeButtonsProps = {
  onButtonPress: (house: HouseButtonProps['house']) => void;
};

export const HomeButtons = ({
  onButtonPress,
}: HomeButtonsProps): React.ReactElement => {
  const dispatch = useReduxDispatch();

  return (
    <View style={styles.buttonsContainer}>
      <View style={styles.buttonRow}>
        <HouseButton house="Gryffindor" onButtonPress={onButtonPress} />
        <HouseButton house="Slytherin" onButtonPress={onButtonPress} />
      </View>
      <View style={styles.buttonRow}>
        <HouseButton house="Ravenclaw" onButtonPress={onButtonPress} />
        <HouseButton house="Hufflepuff" onButtonPress={onButtonPress} />
      </View>
      <View style={styles.notInHouseButtonContainer}>
        <TouchableRipple
          onPress={() => onButtonPress('notInHouse')}
          style={styles.notInHouseButton}
          rippleColor="rgba(0, 0, 0, 0.2)">
          <Text style={styles.houseText}>Not in House</Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  houseText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notInHouseButtonContainer: {
    alignItems: 'center',
  },
  notInHouseButton: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1.3,
    borderColor: '#ccc',
    borderRadius: 20,
  },
});
