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
                {name: "Bench Press", equipment_type: "Barbell", key: "1"},
                {name: "Bicep Curls", equipment_type: "Dumbbells", key: "2"},
                {name: "Front Squat", equipment_type: "Smith Machine", key: "3"},
                {name: "Cardio", equipment_type: "Treadmill", key: "4"},
                {name: "Weighted Crunches", equipment_type: "Plate", key: "5"},
                {name: "Calf Raises", equipment_type: "Dumbbells", key: "6"},
            ]
        });
    }

    render() {
        return (
            <View style={styles.page}>
                <FlatList
                    data={this.state.exercises}
                    contentContainerStyle={styles.list}
                    renderItem={({item, index}) => 
                        <TouchableHighlight onPress={() => this._onExercisePress(item)}>
                            <ExerciseCard
                                name={item.name}
                                muscle_group={item.muscle_group}
                                equipment_type={item.equipment_type}
                            />
                        </TouchableHighlight>
                    }
                />
            </View>
        );
    }

    _onExercisePress(exercise) {

        Alert.alert(
            'Confirm:',
            `Would you like to add this exercise to today's workout?`,
            [
                //Buttons are in the order: (Neutral), Negative, Positive
                {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                {text: 'Yes', onPress: () => {
                    const newExercise = 
                        {name: exercise.name, 
                        muscle_group: 
                        exercise.muscle_group, 
                        equipment_type: exercise.equipment_type, 
                        sets: [],
                        };
                    console.log("New Exercise: ", newExercise);
                    this.props.navigation.state.params.addExercise(newExercise);
                    }
                },
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
    list: {
        justifyContent: 'center',   
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
