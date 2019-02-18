import React from 'react';
<<<<<<< HEAD

import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
} from 'react-native';

import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import DetailScreen from './app/screens/Detail';
import WorkoutScreen from './app/screens/Workouts';
import AddWorkoutScreen from './app/screens/AddWorkout';

import Calendar from './app/components/Calendar';
import BottomBar from './app/components/BottomBar';


class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    if(Platform.OS === 'ios') {
      return (
        <SafeAreaView style={styles.containerIOS}>
          <View style={styles.calendar}>
            <Calendar navigation={this.props.navigation} />
          </View>
          <View style={styles.bottomBar}>
            <BottomBar />
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <View style={styles.containerAND}>
          <View style={styles.calendar}>
            <Calendar navigation={this.props.navigation} />
          </View>
          <View style={styles.bottomBar}>
            <BottomBar />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  containerIOS: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerAND: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  calendar: {
    flex: 11,
  },
  bottomBar: {
    flex: 1,
  },
});

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Detail: DetailScreen,
}, {
    initialRouteName: 'Home',
  });

const AppContainer = createAppContainer(AppNavigator);
=======
import AppContainer from './app/components/AppContainer';
>>>>>>> f9d2ea86d05673dfc97dd4e7cccdab9b1fb63f91

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
