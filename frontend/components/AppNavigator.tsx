import { createStackNavigator } from '@react-navigation/stack';
import FeedPageClub from '../screens/FeedPageClub';
import FeedPageEvent from '../screens/FeedPageEvent';

const FeedStack = createStackNavigator();
const ClubStack = createStackNavigator();

export const FeedStackScreen = () => (
  <FeedStack.Navigator initialRouteName="FeedPageEvent">
    <FeedStack.Screen name="FeedPageEvent" component={FeedPageEvent} />
  </FeedStack.Navigator>
);

export const ClubStackScreen = () => (
  <ClubStack.Navigator initialRouteName="FeedPageClub">
    <ClubStack.Screen name="FeedPageClub" component={FeedPageClub} />
  </ClubStack.Navigator>
);