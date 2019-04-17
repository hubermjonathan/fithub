import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  Text,
  TouchableHighlight
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import { getUserID } from '../lib/AccountFunctions';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      workouts: {},
      refreshing: false,
    }

    this.props.navigation.addListener('didFocus', this.loadItems.bind(this));
  }

  getCurrentDate() {
    let date = new Date();
    let offsetInHours = date.getTimezoneOffset() / 60;
    date.setHours(date.getHours() - offsetInHours);
    return date.toJSON().slice(0, 10);
  }

  async loadItems() {
    if(this.state.refreshing) return;
    
    await this.setState({
      workouts: {},
      refreshing: true,
    });

    let id = await getUserID();
    loadedWorkouts = {};
    fetch('https://fithub-server.herokuapp.com/logs/'+id)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      for(let i = 0; i < data.logs.length; i++) {
        let date = new Date(data.logs[i].date);
        date = date.toJSON().slice(0, 10);
        if(loadedWorkouts[date] === undefined) {
          loadedWorkouts[date] = [];
        }
        loadedWorkouts[date].push(data.logs[i]);
      }

      this.setState({
        workouts: loadedWorkouts,
        refreshing: false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  renderItem(item) {
    return (
      <TouchableHighlight
        onPress={() => { this.props.navigation.push('Details', item)}}
        style={[styles.item, styles.dropShadow]}
        underlayColor='#eee'
      >
        <Text style={{fontWeight: 'bold', fontSize: 24}}>{item.name}</Text>
      </TouchableHighlight>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.empty}>
        <Text>No workout logged...</Text>
      </View>
    );
  }

  render() {
    if(Platform.OS === 'ios') {
      return (
        <SafeAreaView style={styles.containerIOS}>
          <Agenda
            items={this.state.workouts}
            selected={this.getCurrentDate()}
            loadItemsForMonth={this.loadItems.bind(this)}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}
            onRefresh={this.loadItems.bind(this)}
            refreshing={this.state.refreshing}
          />
        </SafeAreaView>
      );
    } else {
      return (
        <View style={styles.containerAND}>
          <Agenda
            items={this.state.workouts}
            selected={this.getCurrentDate()}
            loadItemsForMonth={this.loadItems.bind(this)}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}
            onRefresh={this.loadItems.bind(this)}
            refreshing={this.state.refreshing}
          />
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
  item: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginRight: 10,
    marginTop: 17,
    height: 75,
    justifyContent: 'center',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    height: 15,
    paddingTop: 30
  },
  dropShadow: {
    shadowColor: '#000',
    shadowOffset: {
        width: 1,
        height: 2,
    },
    shadowOpacity: .4,
    shadowRadius: 3,
  },
});
