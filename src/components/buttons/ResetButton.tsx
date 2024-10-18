/*
 *     FRAMEWORK
 */
import React, {useState} from 'react';
/*
 *     STATE
 */
import {useReduxDispatch} from '../../redux/store';
import {resetCounters} from '../../redux/characters/charactersSlice';
import {resetGuesses} from '../../redux/list/listSlise';
/*
 *     COMPONENTS
 */
import {Button, Dialog, Portal, Text} from 'react-native-paper';
/*
 *     STYLING
 */
import {useAppTheme} from '../../utils/theme';
import {StyleSheet} from 'react-native';

export const ResetButton = (): React.ReactElement => {
  const [visible, setVisible] = useState(false);
  const {colors} = useAppTheme();
  const dispatch = useReduxDispatch();

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleReset = () => {
    dispatch(resetCounters());
    dispatch(resetGuesses());
    hideDialog();
  };

  return (
    <>
      <Button mode="text" onPress={showDialog} textColor={colors.white}>
        Reset
      </Button>

      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{backgroundColor: colors.background}}>
          <Dialog.Title style={[styles.dialogTitle, {color: colors.text}]}>
            Confirm Reset
          </Dialog.Title>
          <Dialog.Content>
            <Text style={[styles.dialogText, {color: colors.text}]}>
              Are you sure you want to reset your scores?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} textColor={colors.text}>
              Cancel
            </Button>
            <Button
              onPress={handleReset}
              buttonColor={colors.buttonBackgrounds.gryffindor}
              textColor={colors.white}>
              Reset
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  dialogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dialogText: {
    fontSize: 16,
    marginVertical: 10,
  },
});
