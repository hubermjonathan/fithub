import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  StatusBar,
  Platform
} from 'react-native';
import { Agenda } from 'react-native-calendars';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      workouts: {},
    }
  }

  render() {
    if(Platform.OS === 'ios') {
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="white"/>
          <Agenda
            selected={'2019-02-09'}
          />
        </SafeAreaView>
      );
    } else {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor="white"/>
          <Agenda
            selected={'2019-02-09'}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
