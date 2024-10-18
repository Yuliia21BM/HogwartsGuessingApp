import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type DetailsScreenRouteParams = {
  characterId: string;
  isSuccess: boolean;
};

export type RootStackParamList = {
  Details: DetailsScreenRouteParams;
  Home: {id?: string};
};

export type DetailsScreenProps = {
  route: RouteProp<RootStackParamList, 'Details'>;
  navigation: StackNavigationProp<RootStackParamList, 'Details'>;
};
