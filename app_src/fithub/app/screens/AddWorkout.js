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

    postCustomWorkout(workout){
        //TODO
    }
}
