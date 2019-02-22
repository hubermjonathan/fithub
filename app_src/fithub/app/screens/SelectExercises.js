import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ScrollView,
    Alert,
    FlatList,
} from 'react-native';

import ExerciseCard from '../components/ExerciseCard';

import { getWorkouts } from '../lib/WorkoutFunctions';

export default class SelectExercisesScreen extends React.Component {

 

    //PROPS SHOULD CONTAIN RELEVANT DATA IN ORDER TO ACCESS WORKOUT IN DATABASE.
    //EXERCISES SELECTED HERE WILL BE SENT TO SERVER IN REAL TIME
    constructor(props) {
        super(props);
    }
    state = {
        exercises: [],
    };

    componentWillMount() {
        this.setState({
            //exercises = GetExercisesFromBackend()
            
            //Dummy data for debugging purposes
            exercises: [
                {exercise: "Bench Press", equipment: "Barbell", key: "1"},
                {exercise: "Bicep Curls", equipment: "Dumbbells", key: "2"},
                {exercise: "Front Squat", equipment: "Smith Machine", key: "3"},
                {exercise: "Cardio", equipment: "Treadmill", key: "4"},
                {exercise: "Weighted Crunches", equipment: "Plate", key: "5"},
                {exercise: "Calf Raises", equipment: "Dumbbells", key: "6"},
            ]
        });
    }

    render() {
        return (
            <View style={styles.page}>
                <FlatList
                    data={this.state.exercises}
                    renderItem={({item, index}) => 
                        <TouchableHighlight onPress={this._onExercisePress}>
                            <ExerciseCard
                                exercise={item.exercise}
                                equipment={item.equipment}
                            />
                        </TouchableHighlight>
                    }
                />
            </View>
        );
    }

    _onExercisePress() {
        Alert.alert(
            'Confirm:',
            'Would you like to add {this.exercise} to {this.props.workout}?',
            [
                //Buttons are in the order: (Neutral), Negative, Positive
                {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                {text: 'Yes', onPress: () => {/*{this.props.getExercise(this.item)}*/} },
            ]
        );
    }
}
const styles = StyleSheet.create({
    input: {
        borderColor: 'grey',
        borderWidth: 4,
        borderRadius: 50,
        width: 300,
        textAlign: 'center',
        fontFamily: 'System',
        fontSize: 18,
        padding: 5,
        color: 'grey'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15
    },
    centerE: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 25
    },
    centerText: {
        textAlign: 'center',
        fontFamily: 'System',
        fontSize: 20,
        color: 'grey'
    },
    buttonText: {
        fontFamily: 'System'
    },
    cancel: {

    },

});
