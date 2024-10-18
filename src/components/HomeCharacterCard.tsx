/*
 *     FRAMEWORK
 */
import React from 'react';
/*
 *     COMPONENTS
 */
import {View, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {getDefaultAvatars} from '../utils';
/*
 *     STYLING
 */
import {useAppTheme} from '../utils/theme';
type HomeCharacterCardProps = {
  image: string;
  gender: string | null;
  name: string;
};

export const HomeCharacterCard = ({
  image,
  gender,
  name,
}: HomeCharacterCardProps): React.ReactElement => {
  const {colors} = useAppTheme();

  const src = getDefaultAvatars(image, gender);

  return (
    <View style={styles.characterContainer}>
      <Image source={src} style={styles.characterImage} />

      <Text style={[styles.characterName, {color: colors.text}]}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  characterContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  characterImage: {
    width: 140,
    height: 160,
    borderRadius: 75,
    marginBottom: 10,
  },
  characterName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
