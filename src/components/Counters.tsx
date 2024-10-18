/*
 *     FRAMEWORK
 */
import React from 'react';
/*
 *     STATE
 */
import {useReduxSelector} from '../redux/store';
import {
  selectTotalClicks,
  selectSuccessClicks,
  selectFailedClicks,
} from '../redux/characters/charactersSelectors';
/*
 *     COMPONENTS
 */
import {View, StyleSheet} from 'react-native';
import {Card, Text} from 'react-native-paper';
/*
 *     STYLING
 */
import {useAppTheme} from '../utils/theme';

type CounterCardProps = {
  title: string;
  amount: number;
};

const CounterCard = ({title, amount}: CounterCardProps): React.ReactElement => {
  const {colors} = useAppTheme();
  return (
    <Card
      style={[styles.counterCard, {backgroundColor: colors.cardBackground}]}>
      <Text style={[styles.counterNumber, {color: colors.gold}]}>{amount}</Text>
      <Text style={[styles.counterText, {color: colors.text}]}>{title}</Text>
    </Card>
  );
};

export const Counters = (): React.ReactElement => {
  const total = useReduxSelector(selectTotalClicks);
  const success = useReduxSelector(selectSuccessClicks);
  const failed = useReduxSelector(selectFailedClicks);
  const cards: CounterCardProps[] = [
    {title: 'Total', amount: total},
    {title: 'Success', amount: success},
    {title: 'Failed', amount: failed},
  ];
  return (
    <View style={styles.countersContainer}>
      {cards.map(card => (
        <CounterCard key={card.title} title={card.title} amount={card.amount} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  countersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  counterCard: {
    width: '31%',
    padding: 10,
    alignItems: 'center',
  },
  counterNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  counterText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
