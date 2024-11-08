/*
 *     FRAMEWORK
 */
import React, {useEffect} from 'react';
/*
 *     COMPONENTS
 */
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text, ActivityIndicator} from 'react-native-paper';
import {DetailsCard} from '../../components/DetailsCard';
/*
 *     STATE
 */
import {useReduxDispatch, useReduxSelector} from '../../redux/store';
import {fetchCharacterById} from '../../redux/characters/charactersOperations';
import {
  selectCharacterDetails,
  selectisDetailLoading,
} from '../../redux/characters/charactersSelectors';
import {setCharacterDetailsById} from '../../redux/characters/charactersSlice';
/*
 *     STYLING
 */
import {commonColors, useAppTheme} from '../../utils/theme';
/*
 *     TYPES
 */
import {DetailsScreenProps} from './types';

export const DetailsScreen: React.FC<DetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const {characterId, isSuccess} = route.params;
  const dispatch = useReduxDispatch();
  const characterDetails = useReduxSelector(selectCharacterDetails);
  const {colors} = useAppTheme();
  const isLoading = useReduxSelector(selectisDetailLoading);

  useEffect(() => {
    if (characterId) {
      dispatch(setCharacterDetailsById());
      dispatch(fetchCharacterById(characterId));
    }
  }, [characterId]);

  const onReloadItemPress = () => {
    if (!characterDetails) {
      return;
    }
    navigation.navigate('Home', {id: characterDetails.id});
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {backgroundColor: colors.background},
      ]}>
      <View style={styles.cardWrapper}>
        {isLoading ? (
          <ActivityIndicator
            animating={true}
            color={commonColors.gold}
            size={40}
          />
        ) : characterDetails ? (
          <DetailsCard
            onReloadItemPress={onReloadItemPress}
            isSuccess={isSuccess}
          />
        ) : (
          <Text>No details found.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  cardWrapper: {
    overflow: 'hidden',
  },
});
