import React from 'React';
import { Icon } from 'react-native-elements';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import AddWorkoutScreen from '../screens/AddWorkout';
import LoggerScreen from '../screens/Logger';
import HomeScreen from '../screens/HomeScreen';
import FeedScreen from '../screens/Feed';
import ProfileScreen from '../screens/Profile';
import CreateExercisesScreen from '../screens/CreateExercises';
import CreateWorkoutScreen from '../screens/CreateWorkout';

import DetailScreen from '../screens/Detail';

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  Details: DetailScreen
});

const AppContainer = createAppContainer(createBottomTabNavigator(
  {
    Logger: {
      screen: LoggerScreen,
      navigationOptions: {
        tabBarIcon: <Icon name="add" type="material" size={35} />
      }
    },
    Workouts: {
      screen: AddWorkoutScreen,
      navigationOptions: {
        tabBarIcon: <Icon name="book" type="material" size={35} />
      }
    },
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: <Icon name="home" type="material" size={35} />
      }
    },
    Feed: {
      screen: FeedScreen,
      navigationOptions: {
        tabBarIcon: <Icon name="language" type="material" size={35} />
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: <Icon name="person" type="material" size={35} />
      }
    },
  },
  {
    tabBarOptions: {
      style: {
        height: 55,
      },
      activeTintColor: '#00adf5',
    },
    initialRouteName: 'Home'
  }
));

export default AppContainer;
