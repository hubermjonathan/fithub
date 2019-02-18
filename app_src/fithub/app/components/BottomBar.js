import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import { Icon } from 'react-native-elements';
/*import AddWorkoutScreen from '../screens/AddWorkout';
import HomeScreen from '../screens/HomeScreen';
import FeedScreen from '../screens/Feed';
import DetailScreen from '../screens/Detail';
import ProfileScreen from '../screens/Profile';

import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';*/

import AppContainer from './AppContainer';


export default class BottomBar extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={styles.barContainer}>
        {/* go to DetailScreen */}
        <Icon
          name="book"
          type="material-community"
          size={35}
          onPress={() => this.props.navigation.navigate('Details')}
        />
        {/* go to AddWorkoutScreen */}
        <Icon
          name="plus"
          type="entypo"
          size={35}
          onPress={() => this.props.navigation.navigate('AddWorkout')}
        />
        {/* go to HomeScreen */}
        <Icon
          name="home"
          type="material-community"
          size={35}
          onPress={() => this.props.navigation.navigate('Home')}
        />
        {/* go to FeedScreen */}
        <Icon
          name="globe"
          type="entypo"
          size={35}
          onPress={() => this.props.navigation.navigate('Feed')}
        />
        {/* go to ProfileScreen */}
        <Icon
          name="account"
          type="material-community"
          size={35}
          onPress={() => this.props.navigation.navigate('Profile')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingTop: 20,
  }
});

/*const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Detail: DetailScreen,
  Profile: ProfileScreen,
  Add: AddWorkoutScreen,
  Feed: FeedScreen,
}, {
    initialRouteName: 'Home',
  });

const AppContainer = createAppContainer(AppNavigator);*/
