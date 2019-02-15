import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableHighlight
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import Detail from './app/screens/Detail';


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      workouts: {},
    }
  }

  render() {
    if (Platform.OS === 'ios') {
      return (
        <SafeAreaView style={styles.container}>
          <Agenda
            items={this.state.workouts}
            selected={this.getCurrentDate()}
            loadItemsForMonth={this.loadItems.bind(this)}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}
          />
          <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'flex-end',
            }}>
            <Icon
                name="book"
                type="material-community"
                size={50}
            />
            <Icon
              name="plus"
              type="entypo"
              size={50}
            />
            <Icon
              name="home"
              type="material-community"
              size={50}
            />
            <Icon
              name="globe"
              type="entypo"
              size={50}
            />
            <Icon
                name="account"
                type="material-community"
                size={50}
            />
            </View>
        </SafeAreaView>
      );
    } else {
      return (
        <View style={styles.container}>
          <Agenda
            items={this.state.workouts}
            selected={'2019-02-09'}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}
          />
        </View>
      );
    }
  }

  getCurrentDate() {
    let date = new Date();
    return date.toJSON().slice(0, 10);
  }

  loadItems(month) {
    setTimeout(() => {
      loadedWorkouts = {}

      fetch("https://swapi.co/api/people")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        for(let i = 0; i < 31; i++) {
          let date = new Date(month.timestamp + (i * 24 * 60 * 60 * 1000));
          date = date.toJSON().slice(0, 10);
          loadedWorkouts[date] = [];
        }

        for(let i = 0; i < data.results.length; i++) {
          let date = new Date(data.results[i].created);
          date = date.toJSON().slice(0, 10);
          if(loadedWorkouts[date] == undefined) {
            loadedWorkouts[date] = [];
          }
          loadedWorkouts[date].push({ text: data.results[i].name });
        }

        this.setState({
          workouts: loadedWorkouts
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }, 1000);
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  renderItem(item) {
    return (
      <TouchableHighlight onPress={this.linkToDetail.bind(this, item)} style={styles.item}>
        <Text>{item.text}</Text>
      </TouchableHighlight>
    );
  }

  linkToDetail(item) {
    console.log(item);
    this.props.navigation.push('Detail', {
      name: item.text,
    });
  }

  renderEmptyDate() {
    return (
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

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Detail: Detail
}, {
  initialRouteName: 'Home',
  headerMode: 'none'
});

export default createAppContainer(AppNavigator);
