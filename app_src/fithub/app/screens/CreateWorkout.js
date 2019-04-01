import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, FlatList, TextInput } from 'react-native';
import Swipeout from 'react-native-swipeout';

import SelectExercisesScreen from './SelectExercises';

export default class CreateWorkoutScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: undefined,
            exercises: [],
        }
    }
    
    render() {
        return (
            <View style={styles.page}>
                <View style={styles.content}>
                    <View style={styles.workout}> 
                        <Text style={styles.text}>Name of Workout</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(name) => { this.setState({ name: name })} }
                        />
                    </View>
                    <View style={styles.exercises}>
                        <Text style={styles.text}>Exercises</Text>
                        <View style={styles.list}>
                            <FlatList
                                data={this.state.exercises}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={(item) => 
                                    <Swipeout>
                                        <ExerciseCard
                                            name={item.name}
                                            muscle_group={item.muscle_group}
                                            equipment_type={item.equipment_type}
                                        />
                                    </Swipeout>
                                }
                            />
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity 
                                onPress={() => { this.onAddExercise() }}
                            > 
                                <Text style={styles.buttonText}>Add Exercise</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    _onAddExercise() {
        console.log("Pressed!");
    }

    _onSubmitWorkout() {
        //If exerciseName or equipmentType is null
        if (this.state.workoutName === undefined) {
            Alert.alert(
                'Error',
                'Please specify a valid exercise name and equipment type',
                [
                    {text: 'OK', onPress: () => {}}
                ]
            )
            return;
        }
        
        var body = `Would you like to create the custom exercise '${this.exerciseName}'?`
        Alert.alert(
            'Exercise',
            body,
            [
                //Buttons are in the order: (Neutral), Negative, Positive
                {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                {text: 'Yes', onPress: () => { this._postExerciseToAccount() }},
            ]
        );
    }

    _postExerciseToAccount() {
        
    }
}
const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#f4f4f4', 
    },
    content: {
        alignItems: 'stretch',
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 17,
    },
    workout: {
    }, 
    exercises: {
    },
    list: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
    },
    text: {
        textAlign: 'center',
        fontSize: 30,
    },
    input: {
        fontSize: 24,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
    },
    button: {
        flex: 0,
        marginTop: 10,
        paddingBottom: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dedad6',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderTopColor: '#333',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#00adf5'
    }
});
