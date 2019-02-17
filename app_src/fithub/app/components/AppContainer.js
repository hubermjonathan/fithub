import {createStackNavigator,createAppContainer} from 'react-navigation';
import AddWorkoutScreen from '../screens/AddWorkout';
import HomeScreen from '../screens/HomeScreen';
import FeedScreen from '../screens/Feed';
import DetailScreen from '../screens/Detail';
import ProfileScreen from '../screens/Profile';

const AppNavigator = createStackNavigator({
    Home: HomeScreen,
    Details: DetailScreen,
    Profile: ProfileScreen,
    Add: AddWorkoutScreen,
    Feed: FeedScreen,
  }, {
      initialRouteName: 'Home',
    });
  
  const AppContainer = createAppContainer(AppNavigator);

  export default AppContainer;