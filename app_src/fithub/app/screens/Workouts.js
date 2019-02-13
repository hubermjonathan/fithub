import React,{ Component } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    StatusBar,
    Platform
} from 'react-native';

export default class Workouts extends React.Component {

    render() {
        return (
            <Text>workouts Screen</Text>
        )
    }


    //fetches user's workouts from server given a uid
  getWorkouts(uid) {
    fetch(`/users/${uid}/workouts`, {
      method: 'GET'
    }).then(res => res.json())
      .then((res) => console.log(res))
      .catch(function (e) {
        console.log("User not found");
      });
  }

}


