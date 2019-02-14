import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    StatusBar,
    Platform
} from 'react-native';

export default class AddWorkout extends React.Component {

    render() {
        return (
            <Text>add a workout screen Screen</Text>
        )
    }

    /*posts workout data to server*/
    postStandardWorkout(workout) {
        fetch('/workouts/new', {
            method: 'POST',
            body: JSON.stringify(workout)
        }).then(res => res.json())
            .then((res) => console.log('Success',JSON.stringify(res)))
            .catch(function (e) {
                console.log('Error');
            });
    }

    /*could delete this later since it's identical to first one*/
    postCustomWorkout(workout){
        fetch('/workouts/new', {
            method: 'POST',
            body: JSON.stringify(workout)
        }).then(res => res.json())
            .then((res) => console.log('Success',JSON.stringify(res)))
            .catch(function (e) {
                console.log('Error');
            });
    }
}
