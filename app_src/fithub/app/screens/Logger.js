import React from 'react';
import { View, SafeAreaView, Text, TextInput, StyleSheet, Platform, FlatList, Modal, Button } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';

import LogCard from '../components/LogCard';

import { postLog } from '../lib/LogFunctions';

import {
    createStackNavigator,
    createAppContainer
  } from 'react-navigation';


export default class LoggerScreen extends React.Component {

    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title: `Today's Workout`,
    //         headerRight: <Icon name="add" type="material" size={35} onPress={ navigation.navigate('SelectExercises', {_handleAddSetButton: this._handleAddSetButton })}/>
    //     }
    // };

    constructor(props) {
        super(props);
        //this.props.navigation.getParam('workout', null);
        const workout = Workout;
        this.state = {
            workout: workout,
            name: workout.name,
            uid: workout.uid,
            exercises: workout.exercises,

            addSetModalIsVisible: false,
            modalReps: undefined,
            modalWeight: undefined,
            modalWarmup: false,
            arrayIndex: undefined,
        }
    }

    render() {
        return(
            <View style={styles.page}>
                <View>
                    <FlatList
                        data={this.state.exercises}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.list}
                        renderItem={(item) => this.renderExerciseTable(item)}
                    />
                </View>
            </View>
        );
    }
    

    renderExerciseTable(item, index) {
//console.log("EXERCISE: ", item);
        return(
            <View style={styles.card}>
                <LogCard
                    exercise={item.item}
                    index={item.index}
                    addSet={this._addSet}
                    duplicateSet={this._duplicateSet}
                    deleteSet={this._deleteSet}
                />
            </View>
        );
    }

    //Functions to be passed to children elements for logging modifications.
    _addSet = (exercise, set) => {
        const newExercises = this.state.exercises;
        newExercises[exercise.index].sets.push(set);
        this.setState({
            exercises: newExercises
        });
    }

    _duplicateSet = (exercise, index) => {
        const newSet = this.state.exercises[exercise.index].set[index];
        const newExercises = this.state.exercises;
        newExercises[exercise.index].sets.splice(index, 0, newSet);
        this.setState({
            exercises: newExercises
        });
    }

    _deleteSet = (exerciseIndex, setIndex) => {
        const newExercises = this.state.exercises;
        newExercises[exerciseIndex].sets.splice(setIndex, 1);
        this.setState({
            exercises: newExercises
        });
    }

    _modalOK = () => {
        if (this.state.modalReps !== undefined && this.state.modalWeight !== undefined) {
            this.setState(prevState => {
                const updatedExercises = prevState.exercises;
                updatedExercises[this.state.arrayIndex]
                    .sets.push({"weight": this.state.modalWeight, "reps": this.state.modalReps, "warmup": this.state.modalWarmup});
                exercises: updatedExercises
            });

            var Workout = {
                name: this.state.name,
                exercises: this.state.exercises,
            }
            console.log(Workout);
            const result = postLog(Workout);
        }
        this.setState({
            modalReps: undefined,
            modalWeight: undefined,
            addSetModalIsVisible: false
        });
    }

    _handleAddExercisesButton(exercise) {
        console.log(exercise);
        this.setState(prevState => {
            exersise.sets = [];
            exercises: prevState.push(exercise)
        });
    }
}

const styles = StyleSheet.create({
    page: {
        marginTop: '3%',
        width: '100%',
        backgroundColor: '#f4f4f4',
        alignItems: 'stretch',           
        
    },
    list: {
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    modal: {
        marginTop: '5%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    modalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 5,
    },
    modalTextInput: {
        flex: 1,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
});

const Workout = {
    uid: '12345678910',
    name: 'Chest Day Boi',
    exercises: [
      {name: 'Bench Press', muscle_group: 'Pectoralis', equipment_type: 'Barbell', sets: [
        {weight: 135, reps: 15, warmup: true},
        {weight: 155, reps: 12, warmup: true},
        {weight: 185, reps: 8, warmup: false},
        {weight: 215, reps: 6, warmup: false},
        {weight: 225, reps: 4, warmup: false},
      ]},
      {name: 'Chest Pullovers', muscle_group: 'Pectoralis', equipment_type: 'Dumbbell', sets: [
        {weight: 40, reps: 10, warmup: false},
        {weight: 40, reps: 10, warmup: false},
        {weight: 45, reps: 8, warmup: false},
        {weight: 50, reps: 6, warmup: false},
        {weight: 50, reps: 4, warmup: false},
      ]},
      {name: 'Flyes', muscle_group: 'Pectoralis', equipment_type: 'Cables', sets: [
        {weight: 40, reps: 15, warmup: false},
        {weight: 40, reps: 15, warmup: false},
        {weight: 45, reps: 10, warmup: false},
        {weight: 55, reps: 8, warmup: false},
        {weight: 50, reps: 8, warmup: false},
      ]}
    ],
  };