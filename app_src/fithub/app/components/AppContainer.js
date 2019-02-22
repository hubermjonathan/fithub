import {createStackNavigator,createAppContainer} from 'react-navigation';
import AddWorkoutScreen from '../screens/AddWorkout';
import HomeScreen from '../screens/HomeScreen';
import FeedScreen from '../screens/Feed';
import DetailScreen from '../screens/Detail';
import ProfileScreen from '../screens/Profile';
import CreateExercisesScreen from '../screens/CreateExercises';
import CreateWorkoutScreen from '../screens/CreateWorkout';

const AppNavigator = createStackNavigator({
    Home: HomeScreen,
    Details: DetailScreen,
    Profile: ProfileScreen,
    AddWorkout: AddWorkoutScreen,
    Feed: CreateWorkoutScreen,
  }, {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
        headerTintColor: '#00adf5'
      }
    });
  
  const AppContainer = createAppContainer(AppNavigator);

  export default AppContainer;