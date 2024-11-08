/*
 *     FRAMEWORK
 */
import React, {useState} from 'react';
/*
 *     COMPONENTS
 */
import {StyleSheet, View, FlatList, Image} from 'react-native';
import {Text, TouchableRipple, Icon, IconButton} from 'react-native-paper';
import {Counters} from '../../components/Counters';
import {Searchbar} from 'react-native-paper';
import {getDefaultAvatars} from '../../utils';
/*
 *     STATE
 */
import {useReduxSelector} from '../../redux/store';
import {selectGuesses} from '../../redux/list/listSelectors';
import {GuessRecord} from '../../redux/list/types';

/*
 *     STYLING
 */
import {useAppTheme} from '../../utils/theme';
/*
 *     TYPES
 */
import {ListScreenProps} from './types';

export const ListScreen: React.FC<ListScreenProps> = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const {colors} = useAppTheme();
  const guesses = useReduxSelector(selectGuesses);

  const filteredGuesses = guesses.filter(guess =>
    guess.characterName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const onItemPress = (item: GuessRecord) => {
    navigation.navigate('Details', {
      characterId: item.characterId,
      isSuccess: item.success,
    });
  };

  const onReloadItemPress = (item: GuessRecord) => {
    navigation.navigate('Home', {
      id: item.characterId,
      attempt: item.attempts,
    });
  };

  const renderItem = ({item}: {item: GuessRecord}) => {
    const src = getDefaultAvatars(item.characterImage, item.gender);
    return (
      <TouchableRipple
        style={styles.guessItem}
        onPress={() => onItemPress(item)}>
        <View style={styles.guessContainer}>
          <View style={[styles.rowContainer, {flex: 4}]}>
            <Image source={src} style={styles.guessItemImage} />
            <View style={{flex: 1}}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.characterName}>
                {item.characterName}
              </Text>
              <Text
                style={
                  styles.attemptsText
                }>{`Attempts: ${item.attempts}`}</Text>
            </View>
          </View>
          <View
            style={[
              styles.rowContainer,
              {flex: 2, justifyContent: 'flex-end'},
            ]}>
            {!item.success && (
              <IconButton
                icon={'sync'}
                size={35}
                iconColor="gray"
                onPress={() => onReloadItemPress(item)}
              />
            )}
            {item.success ? (
              <Icon source={'check-circle'} size={35} color="green" />
            ) : (
              <Icon source={'close-circle-outline'} size={35} color="red" />
            )}
          </View>
        </View>
      </TouchableRipple>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Counters />
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={styles.searchInput}
      />
      <View style={{flex: 1}}>
        {filteredGuesses.length > 0 ? (
          <FlatList
            data={filteredGuesses}
            renderItem={renderItem}
            keyExtractor={item => item.characterId}
            style={styles.list}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <Text style={styles.defaultText}>No guessed characters</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 0,
  },
  searchBar: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.3,
    borderColor: '#ccc',
    borderRadius: 20,
    backgroundColor: 'transparent',
    marginTop: 10,
  },
  searchInput: {
    fontSize: 16,
  },
  defaultText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  guessItem: {
    marginVertical: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  guessContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  guessItemImage: {
    width: 50,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 20,
    marginRight: 10,
  },
  characterName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  attemptsText: {
    fontSize: 14,
  },
  list: {
    marginTop: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
