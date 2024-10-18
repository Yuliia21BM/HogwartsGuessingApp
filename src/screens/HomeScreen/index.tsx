/*
 *     FRAMEWORK
 */
import React, {useEffect, useRef, useState} from 'react';
/*
 *     COMPONENTS
 */
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  Animated,
  View,
} from 'react-native';
import {Counters} from '../../components/Counters';
import {HomeCharacterCard} from '../../components/HomeCharacterCard';
import {HomeButtons} from '../../components/buttons/HomeButtons';
import {ActivityIndicator, Text} from 'react-native-paper';
/*
 *     STATE
 */
import {useReduxDispatch, useReduxSelector} from '../../redux/store';
import {
  incrementFailedClicks,
  incrementSuccessClicks,
  setCharacterByIdAsRandom,
  setRandomCharacter,
} from '../../redux/characters/charactersSlice';
import {
  fetchCharacterById,
  fetchCharacters,
} from '../../redux/characters/charactersOperations';
import {
  selectRandomCharacter,
  selectisCharacterLoading,
} from '../../redux/characters/charactersSelectors';
import {HouseButtonProps} from '../../components/buttons/HouseButton';
import {addGuess} from '../../redux/list/listSlise';
import {GuessRecord} from '../../redux/list/types';
/*
 *     STYLING
 */
import {commonColors, useAppTheme} from '../../utils/theme';

/*
 *     TYPES
 */
import {HomeScreenProps} from './types';

export const HomeScreen: React.FC<HomeScreenProps> = ({route, navigation}) => {
  const dispatch = useReduxDispatch();
  const randomCharacter = useReduxSelector(selectRandomCharacter);
  const [refreshing, setRefreshing] = useState(false);
  const {colors} = useAppTheme();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayColor, setOverlayColor] = useState('transparent');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isLoading = useReduxSelector(selectisCharacterLoading);

  const showOverlay = (color: string) => {
    setOverlayColor(color);
    setOverlayVisible(true);

    Animated.timing(fadeAnim, {
      toValue: 0.7,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        hideOverlay();
      }, 50);
    });
  };

  const hideOverlay = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setOverlayVisible(false);
    });
  };

  useEffect(() => {
    dispatch(fetchCharacters());
  }, []);

  useEffect(() => {
    if (route.params?.id) {
      dispatch(setCharacterByIdAsRandom(route.params.id));
      dispatch(fetchCharacterById(route.params.id));
    } else {
      dispatch(fetchCharacters());
    }
  }, [route.params?.id, route.params.attempt]);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(setRandomCharacter());
    setRefreshing(false);
  };

  const onButtonPress = (house: HouseButtonProps['house']) => {
    if (!randomCharacter) return;

    const newGuessRecord: GuessRecord = {
      characterId: randomCharacter.id,
      characterName: randomCharacter.name,
      characterImage: randomCharacter.image,
      house: randomCharacter.house,
      success: false,
      attempts: 1,
      gender: randomCharacter.gender,
    };

    let isCorrect = false;

    if (
      (randomCharacter.house === '' && house === 'notInHouse') ||
      randomCharacter.house === house
    ) {
      dispatch(incrementSuccessClicks(1));
      newGuessRecord.success = true;
      isCorrect = true;
    } else {
      dispatch(incrementFailedClicks(1));
    }
    const color = isCorrect ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.7)';
    showOverlay(color);

    onRefresh();
    dispatch(addGuess(newGuessRecord));
  };

  console.log('isLoading', isLoading);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {backgroundColor: colors.background},
      ]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Counters />
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color={commonColors.gold}
          size={40}
        />
      ) : randomCharacter ? (
        <HomeCharacterCard
          image={randomCharacter?.image || ''}
          name={randomCharacter?.name || ''}
          gender={randomCharacter?.gender || null}
        />
      ) : (
        <View style={styles.defaultwrapper}>
          <Text style={styles.defaultText}>No character found.</Text>
        </View>
      )}
      <HomeButtons onButtonPress={onButtonPress} />
      {overlayVisible && (
        <Animated.View
          style={[
            styles.overlay,
            {backgroundColor: overlayColor, opacity: fadeAnim},
          ]}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  defaultwrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultText: {
    fontSize: 20,
  },
});
