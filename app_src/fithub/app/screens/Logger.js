import React from 'react';

import { View, SafeAreaView, Text, TextInput, StyleSheet, Platform, FlatList, Modal, Button, TouchableHighlight, Alert } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import LogCard from '../components/LogCard';
import ExerciseCard from '../components/ExerciseCard';

import { postLog } from '../lib/LogFunctions';



const WorkoutContext = React.createContext();

class ContextProvider extends React.Component {
    constructor(props) {
        super(props);
        const workout = Workout;
        this.state = {
            workout: workout,
            name: workout.name,
            uid: workout.uid,
            exercises: workout.exercises,
        }
    }

    render() {
        return (
            <WorkoutContext.Provider value={{
                state: this.state,
                addExercise: (newExercise) => {
                    //console.log("New Exercise: ", newExercise);        
                    //const newExercises = JSON.parse(JSON.stringify(this.state.exercises));
                    const newExercises = this.state.exercises;
                    newExercises.push(newExercise);
                    //console.log("New Exercises: ", newExercises);
                    this.setState({
                        exercises: newExercises 
                    });
                },
                addSet: (exerciseIndex, set) => {
                    const newExercises = JSON.parse(JSON.stringify(this.state.exercises));
                    newExercises[exerciseIndex].sets.push(set);
                    this.setState({
                        exercises: newExercises
                    });
                },
                duplicateSet: (exerciseIndex, setIndex) => {
                    const newSet = this.state.exercises[exerciseIndex].sets[setIndex];
                    const newExercises = JSON.parse(JSON.stringify(this.state.exercises));
                    newExercises[exerciseIndex].sets.splice(setIndex, 0, newSet);
                    this.setState({
                        exercises: newExercises
                    });
                },
                deleteSet: (exerciseIndex, setIndex) => {
                    const newExercises = JSON.parse(JSON.stringify(this.state.exercises));
                    newExercises[exerciseIndex].sets.splice(setIndex, 1);
                    this.setState({
                        exercises: newExercises
                    });
                }
            }}>
            {this.props.children}
            </WorkoutContext.Provider>
        );
    }
}

class Logger extends React.Component {
    constructor(props) {
        super(props);
        //this.props.navigation.getParam('workout', null);
        //const workout = Workout;
        this.state = {
            addSetModalIsVisible: false,
            modalReps: undefined,
            modalWeight: undefined,
            modalWarmup: false,
            arrayIndex: undefined,
        }
    }
    
    render() {
        return(
            <WorkoutContext.Consumer> 
                {(context) => (
                    console.log("Context of Logger: ", context),
                    <View style={styles.page}> 
                        <View>
                            <FlatList
                                data={context.state.exercises}
                                extraData={context.state.exercises}
                                keyExtractor={(item, index) => index.toString()}
                                contentContainerStyle={styles.list}
                                renderItem={(item) => this.renderExerciseTable(context, item)}
                            />
                        </View>
                    </View>
                )}
            </WorkoutContext.Consumer>
        );
    }

    renderExerciseTable(context, item) {
        return(
            <View style={styles.card}>
                <LogCard
                    exercise={item.item}
                    index={item.index}
                    addSet={context.addSet}
                    duplicateSet={context.duplicateSet}
                    deleteSet={context.deleteSet}
                />
            </View>
        );
    }
}

class SelectExercises extends React.Component {

    constructor(props) {
        super(props);
    }
    state = {
        exercises: [
            {name: "Bench Press", equipment_type: "Barbell", key: "1"},
            {name: "Bicep Curls", equipment_type: "Dumbbells", key: "2"},
            {name: "Front Squat", equipment_type: "Smith Machine", key: "3"},
            {name: "Cardio", equipment_type: "Treadmill", key: "4"},
            {name: "Weighted Crunches", equipment_type: "Plate", key: "5"},
            {name: "Calf Raises", equipment_type: "Dumbbells", key: "6"},
        ]
    };

    render() {
        return (
            <WorkoutContext.Consumer>
                {(context) => (
                    <View style={styles.page}>
                        <FlatList
                            data={this.state.exercises}
                            contentContainerStyle={styles.list}
                            renderItem={({item, index}) => 
                                <TouchableHighlight onPress={() => {this._onExercisePress(context, item)}}>
                                    <ExerciseCard 
                                        name={item.name}
                                        muscle_group={item.muscle_group}
                                        equipment_type={item.equipment_type}
                                    />
                                </TouchableHighlight>
                            }
                        />
                    </View>
                )}
            </WorkoutContext.Consumer>
        );
    }

    _onExercisePress(context, exercise) {
        Alert.alert(
            'Confirm:',
            `Would you like to add this exercise to today's workout?`,
            [
                //Buttons are in the order: (Neutral), Negative, Positive 
                {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                {text: 'Yes', onPress: () => {
                    const newExercise = {
                        name: exercise.name, 
                        muscle_group: exercise.muscle_group, 
                        equipment_type: exercise.equipment_type, 
                        sets: [],
                        };
                    context.addExercise(newExercise);
                    }
                },
            ]
        );
    }
}

export class SelectExercisesScreen extends React.Component {
    render() {
        return(
            <ContextProvider>
                <SelectExercises />
            </ContextProvider>
        );
    }
}

export default class LoggerScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: 'Workout',
          headerRight: <Icon name="add" type="material" size={35} onPress={() => {navigation.push('SelectExercises')} } />
        }
    };

    render() {
        return(
            <ContextProvider>
                <Logger />
            </ContextProvider>
        );
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
        //flex: 1,
        //justifyContent: 'center',
        //alignContent: 'center',
         alignItems: 'center',
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
      ]},
      {name: 'Deadlift', muscle_group: 'Legs', equipment_type: 'Barbell', sets: []}
    ],
  };