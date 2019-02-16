import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Dash from 'react-native-dash';
import { Icon } from 'react-native-elements';

export default class WorkoutScreen extends React.Component {

  render() {
    let workouts = this.getWorkouts(/*put id here, idk how to get it for now */);
    return (

      <ScrollView>
        <Text style={styles.title}> Saved Workouts</Text>
        <Dash style={styles.line} />
        
        <View style={styles.add}>
          <TouchableOpacity>
            <Icon
              name="plus"
              type="entypo"
              size={35}
            />
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 15 }}>
          <Text style={styles.group}>
            MuscleGroup
          </Text>
          <Text style={styles.large}>
            Lower Body - 6 Excercises
          </Text>
          <Text style={styles.large}>
            upper Body - 6 Excercises
          </Text>
          <TouchableOpacity>
            <Icon
              name="chevron-right"
              type="entypo"
              size={35}
            />
          </TouchableOpacity>
        </View>

        <View style={{ paddingTop: 15 }}>
          <Text style={styles.group}>
            Chest
          </Text>
          <Text style={styles.large}>
            Chest - 4 Excercises
          </Text>
          <Text style={styles.large}>
            Upper Chest - 3 Excercises
          </Text>
          <Text style={styles.large}>
            Lower Lower - 2 Excercises
          </Text>
          <TouchableOpacity>
            <Icon
              name="chevron-right"
              type="entypo"
              size={35}
            />
          </TouchableOpacity>
        </View>

        <View style={{ paddingTop: 15 }}>
          <Text style={styles.group}>
            Back
          </Text>
          <Text style={styles.large}>
            Lats - 3 Excercises
          </Text>
          <Text style={styles.large}>
            Rear Delts - 3 Excercises
          </Text>
          <Text style={styles.large}>
            Traps - 2 Excercises
          </Text>
          <TouchableOpacity>
            <Icon
              name="chevron-right"
              type="entypo"
              size={35}
            />
          </TouchableOpacity>
        </View>

      </ScrollView>
    )
  }


  //fetches user's workouts from server given a uid
  getWorkouts(uid) {
    fetch(`/users/${uid}/workouts`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => console.log(res))
      .catch(function (e) {
        console.log("User not found");
      });
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 30,
    top: 35
  },
  line: {
    width: 1000,
    height: 1,
    top: 50,

  },
  add: {
    flexDirection: 'row-reverse',
    right: 15,
    bottom: 3,

  },
  group: {
    textAlign: 'center',
    fontSize: 25,
    paddingTop: 15,
    paddingBottom: 15
  },
  large: {
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 25
  }

});


