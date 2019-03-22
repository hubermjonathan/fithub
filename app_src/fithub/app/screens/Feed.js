import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  StatusBar,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  FlatList,
  ListItem
} from 'react-native';
import Dash from 'react-native-dash';
import { Icon, Button } from 'react-native-elements';
import WorkoutCard from '../components/WorkoutCard';

export default class FeedScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Feed',
      headerRight: <Icon
        name="magnifying-glass"
        type="entypo"
        size={30}
        onPress={() => { navigation.push('otherUserProfile') }} />
    }
  };

  constructor(props) {
    super(props);
  }

  state = {
    workouts: []
  }

  componentDidMount() {
    fetch('https://fithub-server.herokuapp.com/workouts/public', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ exercises: [] })
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let builtWorkouts = [];
        let s = JSON.stringify(data);
        let array = JSON.parse(s);
        for (let x = 0; x < array.length; x++) {
          let exercises = [];
          let workouts = [];
          for (let y = 0; y < array[x].exercises.length; y++) {
            exercises.push({ name: array[x].exercises[y].name });
          }//for
          builtWorkouts.push({
            workout: array[x].name,
            user: array[x].ownerUID, //replace with user's profile name later
            icon: "person",
            exercises: exercises
          })
        }//for

        this.setState({ workouts: builtWorkouts })


      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.title}>
            <Text style={styles.title}>Feed</Text>
          </View>
          <View style={styles.search}>
            <TouchableOpacity>
              <Icon
                name="magnifying-glass"
                type="entypo"
                size={30}
                onPress={() => this.props.navigation.navigate('Search')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.workouts}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>{
              //console.log(item.user);
              this.props.navigation.push('Profile', { id: item.user } )
            }}>
              <WorkoutCard
                workout={item.workout}
                user={item.user}
                userPhoto={item.icon}
                exercises={item.exercises}
              />
            </TouchableOpacity>

          )}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 35,
    padding: 5,
  },
  title: {
    fontSize: 25,
    left: 5,
  },
  search: {
    flex: 1,
    flexDirection: 'row-reverse',
    right: 15,
    //bottom: 30,
  },
})
