import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';

import Dash from 'react-native-dash';
import { Icon } from 'react-native-elements';
import BottomBar from '../components/BottomBar';
import WorkoutCard from '../components/WorkoutCard';
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';

export default class WorkoutScreen extends React.Component {

  render() {
    let workouts = this.getWorkouts(/*put id here, idk how to get it for now */);
    return (

      <View>
        <View>
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
        </View>
        <View style={{padding:20,paddingBottom:80}}>
          <WorkoutCard
            group='Muscle Group'
            subgroup1="Lower Body"
            subgroup2="Upper Body"
          />
          <WorkoutCard
            group='Chest'
            subgroup1="Chest"
            subgroup2="Upper Chest"
            subgroup3="Lower Chest"
          />
          <WorkoutCard
            group='Back'
            subgroup1="Lats"
            subgroup2="Rear Delts"
            subgroup3="Traps"
          />
        </View>
        <BottomBar />
      </View>
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
  addSpace: {

  },
  line: {
    width: 1000,
    height: 1,
    top: 50,
    paddingBottom: 30

  },
  add: {
    flexDirection: 'row-reverse',
    right: 15,
    bottom: 30,

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
  },
  bottomBar: {
    flex: 1,
  

  }

});


