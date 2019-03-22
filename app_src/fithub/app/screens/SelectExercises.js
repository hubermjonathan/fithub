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
import { DefaultExercises } from '../defaults/Exercises';
import { connect } from 'react-redux';

class SelectExercisesScreen extends React.Component {

    constructor(props) {
        super(props);
    }
    state = {
        exercises: [],
    };

    componentWillMount() {
        this.setState({
            exercises: DefaultExercises
        });
    }

    render() {
        return (
            <View style={styles.page}>
                <FlatList
                    data={this.state.exercises}
                    contentContainerStyle={styles.list}
                    keyExtractor={(item, index) => index.toString()}
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
        console.log("PROPS: ", this.props.navigation);
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
                    this.props.dispatch({type: "AddExercise", payload: newExercise});
                    }
                },
            ]
        );
    }
}

export default connect((state)=> { return {workout: state.workout}})(SelectExercisesScreen);

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
