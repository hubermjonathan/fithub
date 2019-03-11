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

    static navigationOptions = ({ navigation }) => {
        return {
          title: 'Workout',
          headerRight: <Icon name="add" type="material" size={35} onPress={() => {navigation.push('SelectExercises')} } />
          //headerRight: <Icon name="add" type="material" size={35} onPress={() => {navigation.push('SelectExercises', {addExercise: (newExercise) => this._addExercise})} } />
        }
      };

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
        //this.props.navigation.setParams({addExercise: (newExercise) => this._addExercise});
        return( 
            <View style={styles.page}> 
                <View>
                    <FlatList
                        data={this.state.exercises}
                        extraData={this.state.exercises}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.list}
                        renderItem={(item) => this.renderExerciseTable(item)}
                    />
                </View>
            </View>
        );
    }
    
    //RENDER FUNCTIONS
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

    //MUTATOR FUNCTIONS 
    //Functions to be passed to children elements for logging modifications.
    _addSet = (exerciseIndex, set) => {
        const newExercises = this.state.exercises;
        newExercises[exerciseIndex].sets.push(set);
        this.setState({
            exercises: newExercises
        });
    }

    _duplicateSet = (exerciseIndex, setIndex) => {
        const newSet = this.state.exercises[exerciseIndex].sets[setIndex];
        const newExercises = JSON.parse(JSON.stringify(this.state.exercises));
        newExercises[exerciseIndex].sets.splice(setIndex, 0, newSet);
        this.setState({
            exercises: newExercises
        });
    }

    _deleteSet = (exerciseIndex, setIndex) => {
        // const stateCopy = Object.assign({}, this.state, {});
        // const newExercises = stateCopy.exercises;
        // newExercises[exerciseIndex].sets.splice(setIndex, 1);
        // this.setState({
        //     exercises: newExercises
        // });
        const newExercises = JSON.parse(JSON.stringify(this.state.exercises));
        newExercises[exerciseIndex].sets.splice(setIndex, 1);
        this.setState({
            exercises: newExercises
        });
    }

    _addExercise(newExercise) {
        console.log("New exercise in logger: ", newExercise);
        const newExercises = JSON.parse(JSON.stringify(this.state.exercises));
        newExercises.push(newExercise);
        this.setState({
            exercises: newExercises
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