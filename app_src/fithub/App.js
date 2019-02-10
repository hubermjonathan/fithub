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
            items={this.state.workouts}
            selected={'2019-02-09'}
            loadItemsForMonth={this.loadItems.bind(this)}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
          />
        </SafeAreaView>
      );
    } else {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor="white"/>
          <Agenda
            items={this.state.workouts}
            selected={'2019-02-09'}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
          />
        </View>
      );
    }
  }

  loadItems(month) {
    setTimeout(() => {
      loadedWorkouts = {}

      for(let i = 0; i < 31; i++) {
        let date = new Date(month.timestamp + (i*24*60*60*1000));
        date = date.toJSON().slice(0,10);
        loadedWorkouts[date] = [];
      }

      this.setState({
        workouts: loadedWorkouts
      });
    }, 1000);
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  renderItem(item) {
    return (
      <View style={styles.item}>
        <Text>{item.name}</Text>
      </View>
    );
  }

  renderEmptyDate() {
    return(
      <View style={styles.empty}>
        <Text>You missed the gym this day!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    height: 15
  },
  empty: {
    flex: 1,
    height: 15,
    paddingTop: 30
  },
});
