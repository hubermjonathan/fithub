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
  ListItem,
  Modal,
} from 'react-native';
import Dash from 'react-native-dash';
import { Icon, Button } from 'react-native-elements';
import WorkoutCard from '../components/WorkoutCard';
import { getPublicWorkouts } from '../lib/WorkoutFunctions';
import FeedScreen from './Feed';

export default class GlobalFeedScreen extends React.Component {
  

  constructor(props) {
    super(props);
    this.selectedFilter=this.selectedFilter.bind(this);
  }

  state = {
    modalVisible: false,
    workouts: [],
    muscleGroups: [
      { muscle: "NECK", enum: 1 },
      { muscle: "SHOULDERS", enum: 2 },
      { muscle: "DELTOID", enum: 3 },
      { muscle: "TRICEPS", enum: 4 },
      { muscle: "BICEPS", enum: 5 },
      { muscle: "FOREARMS", enum: 6 },
      { muscle: "BACK", enum: 7 },
      { muscle: "LATS", enum: 8 },
      { muscle: "TRAPS", enum: 9 },
      { muscle: "CHEST", enum: 10 },
      { muscle: "WAIST", enum: 11 },
      { muscle: "OBLIQUES", enum: 12 },
      { muscle: "HIPS", enum: 13 },
      { muscle: "GLUTES", enum: 14 },
      { muscle: "THIGHS", enum: 15 },
      { muscle: "QUADS", enum: 16 },
      { muscle: "HAMSTRINGS", enum: 17 },
      { muscle: "CALVES", enum: 18 },
      { muscle: "ALL", enum: 99 },
    ],
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  selectedFilter = (muscleEnum) => {
    let muscles = { muscles: [] };
    if (muscleEnum === 99) {
      for (let i = i; i < 19; i++) {
        muscles.muscles.push(i);
      }
    } else {
      muscles.muscles.push(muscleEnum);
    }

    getPublicWorkouts(muscles).then(workouts => {
      let builtWorkouts = [];
      let s = JSON.stringify(workouts);
      let array = JSON.parse(s);
      for (let x = 0; x < array.length; x++) {
        let exercises = [];
        let workouts = [];
        for (let y = 0; y < array[x].exercises.length; y++) {
          exercises.push({ name: array[x].exercises[y].name });
        }//for
        builtWorkouts.push({
          workout: array[x].name,
          user: array[x].ownerUID,
          icon: "person",
          exercises: exercises
        })
      }//for

      this.setState({ workouts: builtWorkouts })
    });
    this.setModalVisible(false);
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
        this.setState({ savedWorkout: data });
        let builtWorkouts = [];
        let s = JSON.stringify(data);
        let array = JSON.parse(s);
        for (let x = 0; x < array.length; x++) {
          if (array[x].public == true) { 
          let exercises = [];
          let workouts = [];
          for (let y = 0; y < array[x].exercises.length; y++) {
            let fixedSets = [];
            for (let z = 0; z < array[x].exercises[y].sets.length; z++) {
              let setobj = {
                isWarmup: array[x].exercises[y].sets[z].isWarmup,
                reps: array[x].exercises[y].sets[z].reps,
                weight: array[x].exercises[y].sets[z].weight
              }
              fixedSets.push(setobj);
            }
            exercises.push({
              exists: false,
              name: array[x].exercises[y].name,
              muscle_groups: array[x].exercises[y].muscle_groups,
              equipment_type: array[x].exercises[y].equipment_type,
              sets: fixedSets

            });
          }//for
          builtWorkouts.push({
            id: "",
            uid: "",
            token: "",
            public: false,
            description: array[x].description,
            name: array[x].name,
            workout: array[x].name,
            workoutID: array[x]._id,
            user: array[x].ownerUID, //replace with user's profile name later
            icon: "person",
            date: new Date().toJSON().slice(0, 10),
            exercises: exercises,
            gains: array[x].gains,
            comments: array[x].comments,
            liked_users: array[x].liked_users,
          })
        }
      }//for
    this.setState({ workouts: builtWorkouts })


    })
      .catch((err) => {
    console.log(err);
    });
  }
render() {
  return (
    <SafeAreaView style={{flex:1}}>
      <FeedScreen
        workouts={this.state.workouts}
        muscleGroups={this.state.muscleGroups}
        selectedFilter={this.selectedFilter}
      />
    </SafeAreaView>
    
  )
}
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 45,
    padding: 10,
  },
  title: {
    fontSize: 25,
    left: 5,
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: 15,
    //bottom: 30,
  },
  feed: {
    backgroundColor: '#eee',
  },
})
