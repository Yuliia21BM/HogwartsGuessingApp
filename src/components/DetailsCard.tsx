/*
 *     FRAMEWORK
 */
import React from 'react';
/*
 *     COMPONENTS
 */
import {View, StyleSheet, Image} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import {formatArray, houseImageMap} from '../utils';
/*
 *     STYLING
 */
import {commonColors, useAppTheme} from '../utils/theme';
import {HomeCharacterCard} from './HomeCharacterCard';
import {ObfuscatedTextWithIcon} from './ObfuscatedTextWithIcon';
import {useReduxSelector} from '../redux/store';
import {selectCharacterDetails} from '../redux/characters/charactersSelectors';

type DetailsCardProps = {
  onReloadItemPress: () => void;
  isSuccess: boolean;
};

export const DetailsCard = ({
  onReloadItemPress,
  isSuccess,
}: DetailsCardProps): React.ReactElement => {
  const characterDetails = useReduxSelector(selectCharacterDetails);
  const {colors} = useAppTheme();

  return (
    <Card style={[styles.card, {backgroundColor: colors.cardBackground}]}>
      <View style={styles.imageContainer}>
        <HomeCharacterCard
          gender={characterDetails?.gender || ''}
          name={characterDetails?.name || ''}
          image={characterDetails?.image || ''}
        />
        {isSuccess &&
          characterDetails?.house &&
          houseImageMap[characterDetails.house] && (
            <Image
              source={houseImageMap[characterDetails.house] || undefined}
              style={styles.houseImage}
              resizeMode="contain"
            />
          )}
        {!isSuccess && (
          <View style={styles.banner}>
            <Text style={styles.bannerText}>Access Denied</Text>
            <Text style={styles.bannerMessage}>
              To see all the info, guess the house.
            </Text>
            <Button
              mode="contained"
              style={styles.button}
              textColor={commonColors.primaryBackground}
              onPress={onReloadItemPress}>
              Try to Guess
            </Button>
          </View>
        )}
      </View>

      <View style={styles.listContainer}>
        {characterDetails?.alternate_names.length !== 0 && (
          <View style={styles.infoRow}>
            <Text style={[styles.infoTitle, {color: colors.text}]}>
              Alternate names:
            </Text>
            <ObfuscatedTextWithIcon
              value={formatArray(characterDetails?.alternate_names || [])}
              isHidden={!isSuccess}
              textStyles={[styles.infoValue, {color: colors.text}]}
            />
          </View>
        )}
        <View style={styles.infoRow}>
          <Text style={[styles.infoTitle, {color: colors.text}]}>House:</Text>
          <ObfuscatedTextWithIcon
            value={characterDetails?.house || 'Not in House'}
            isHidden={!isSuccess}
            textStyles={[styles.infoValue, {color: colors.text}]}
          />
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoTitle, {color: colors.text}]}>Wizard:</Text>
          <ObfuscatedTextWithIcon
            value={characterDetails?.wizard ? 'Yes' : 'No'}
            isHidden={!isSuccess}
            textStyles={[styles.infoValue, {color: colors.text}]}
          />
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoTitle, {color: colors.text}]}>Species:</Text>
          <ObfuscatedTextWithIcon
            value={characterDetails?.species || 'unknown'}
            isHidden={!isSuccess}
            textStyles={[styles.infoValue, {color: colors.text}]}
          />
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoTitle, {color: colors.text}]}>Gender:</Text>
          <ObfuscatedTextWithIcon
            value={characterDetails?.gender || 'unknown'}
            isHidden={!isSuccess}
            textStyles={[styles.infoValue, {color: colors.text}]}
          />
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoTitle, {color: colors.text}]}>
            Date of Birth:
          </Text>
          <ObfuscatedTextWithIcon
            value={characterDetails?.dateOfBirth || 'unknown'}
            isHidden={!isSuccess}
            textStyles={[styles.infoValue, {color: colors.text}]}
          />
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoTitle, {color: colors.text}]}>Wand:</Text>
          <View style={styles.sublist}>
            <View style={styles.sublistRow}>
              <Text style={[styles.infoValue, {color: colors.text}]}>
                Core:
              </Text>
              <ObfuscatedTextWithIcon
                value={characterDetails?.wand.core || 'unknown'}
                isHidden={!isSuccess}
                textStyles={[styles.infoValue, {color: colors.text}]}
              />
            </View>
            <View style={styles.sublistRow}>
              <Text style={[styles.infoValue, {color: colors.text}]}>
                Wood:
              </Text>
              <ObfuscatedTextWithIcon
                value={characterDetails?.wand.wood || 'unknown'}
                isHidden={!isSuccess}
                textStyles={[styles.infoValue, {color: colors.text}]}
              />
            </View>
            <View style={styles.sublistRow}>
              <Text style={[styles.infoValue, {color: colors.text}]}>
                Length:
              </Text>
              <ObfuscatedTextWithIcon
                value={characterDetails?.wand.length?.toString() || 'unknown'}
                isHidden={!isSuccess}
                textStyles={[styles.infoValue, {color: colors.text}]}
              />
            </View>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={[styles.infoTitle, {color: colors.text}]}>
            Patronus:
          </Text>
          <ObfuscatedTextWithIcon
            value={characterDetails?.patronus || 'unknown'}
            isHidden={!isSuccess}
            textStyles={[styles.infoValue, {color: colors.text}]}
          />
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoTitle, {color: colors.text}]}>Actor:</Text>
          <ObfuscatedTextWithIcon
            value={characterDetails?.actor || 'unknown'}
            isHidden={!isSuccess}
            textStyles={[styles.infoValue, {color: colors.text}]}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: commonColors.gold,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  houseImage: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 80,
    height: 80,
  },
  banner: {
    position: 'absolute',
    top: 30,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  bannerText: {
    color: commonColors.gold,
    fontWeight: 'bold',
    fontSize: 18,
  },
  bannerMessage: {
    color: commonColors.white,
    textAlign: 'center',
    marginBottom: 5,
  },
  listContainer: {
    padding: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 20,
  },
  sublist: {
    marginLeft: 10,
    marginTop: 5,
    gap: 10,
  },
  sublistRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 18,
    flexShrink: 1,
  },
  button: {
    marginTop: 10,
    backgroundColor: commonColors.white,
    borderColor: commonColors.gold,
    borderWidth: 1,
  },
});
