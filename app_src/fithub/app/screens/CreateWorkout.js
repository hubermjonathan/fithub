import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, FlatList, TextInput, Modal, TouchableHighlight } from 'react-native';
import Swipeout from 'react-native-swipeout'; 

import ExerciseCard from '../components/ExerciseCard';
import { DefaultExercises } from '../defaults/Exercises';

import SelectExercisesScreen from './SelectExercises';

export default class CreateWorkoutScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: {
                visible: false,
            },
            workout: {
                name: undefined,
                exercises: [],
            }
        }
    }
    
    render() {
        console.log(this.state);
        return (
            <ScrollView>
                <View style={styles.page}>
                    <Modal
                        visible={this.state.modal.visible}
                        transparent={false}
                        animationType="fade"
                        presentationStyle="pageSheet"
                    >
                        <View style={styles.modal}>
                            <View style={styles.modalHeading}>
                                <Text style={styles.modalHeadingText}>
                                    Exercises
                                </Text>
                            </View>
                            <View style={styles.exerciseList}>
                                <FlatList
                                    data={DefaultExercises}
                                    contentContainerStyle={styles.list}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({item, index}) => 
                                        <TouchableHighlight 
                                            onPress={() =>
                                                this.setState(prevState => (
                                                    { ...prevState, 
                                                        workout: {...prevState.workout, exercises: [...prevState.workout.exercises, item] },
                                                        modal: {...prevState.modal, visible: false},
                                                    }
                                                ))
                                            }
                                        >
                                            <ExerciseCard
                                                name={item.name}
                                                muscle_group={item.muscle_group}
                                                equipment_type={item.equipment_type}
                                            />
                                        </TouchableHighlight>
                                    }
                                />
                            </View>
                        </View>
                    </Modal>
                    {/*CARD: Create Routine*/}
                    <View style={styles.card}>
                        <View style={styles.cardTitle}> 
                            <TextInput
                                style={styles.titleText}
                                placeholder='Workout Name'
                                //multiline={true}
                                onChangeText={(text) => 
                                    this.setState(prevState => (
                                        { ...prevState, name: text }
                                    ))
                                }
                            />
                        </View>
                        <View style={styles.cardBody}>
                            <FlatList
                                scrollEnabled={false}
                                data={this.state.workout.exercises} 
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={(item) =>  
                                    <Swipeout
                                        style={{backgroundColor: '#fff'}}
                                            right={
                                            [
                                                {
                                                text: 'Delete',
                                                backgroundColor: 'red',
                                                underlayColor: 'rgba(0, 0, 0, 0.6)',
                                                onPress:() => 
                                                    this.setState(prevState => (
                                                        {...prevState,
                                                        workout: {...prevState.workout, exercises: prevState.workout.exercises.filter((_, index) => index !== item.index) }
                                                        
                                                        }
                                                    ))
                                                },
                                            ]
                                            } 
                                        autoClose={true}
                                    >
                                        <View style={styles.cardRow}>
                                            <Text style={styles.exerciseText}>
                                                {item.item.name}
                                            </Text>
                                            <Text style={styles.equipmentTypeText}>
                                                {item.item.equipment_type}
                                            </Text>
                                        </View>
                                    </Swipeout> 
                                }
                            /> 
                        </View>
                    </View>
                    {/*BUTTONS: Add Exercise and Create*/}
                    <View style={styles.buttonRow}>
                        <View style={styles.buttonView}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() =>                                  
                                    this.setState(prevState => (
                                    { ...prevState, modal: {visible: true}}
                                    ))
                                }
                            >
                                <Text style={styles.buttonText}>
                                    Add Exercise
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonView}>
                            <TouchableOpacity
                                style={styles.button}                                
                                onPress={() => { 
                                    //PUSH WORKOUT TO DATABASE HERE
                                    this.setState(prevState => (
                                        { ...prevState, modal: {visible: false}})
                                    )
                                }}
                            >
                                <Text style={styles.buttonText}>
                                    Create
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        //backgroundColor: '#f4f4f4', 
    },

    //Modal
    modal: {

    },
    modalHeading: {
        paddingTop: 15,
        paddingBottom: 15,
    },
    modalHeadingText: {
        textAlign: 'center', 
        fontSize: 40,
        color: '#333',
    },
    
    //Exercise Card
    card: {
        //flex: 1,
        width: '100%',
        alignContent: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginTop: 17,
    },
    cardTitle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    titleText: {
        textAlign: 'center', 
        fontSize: 40,
        color: '#333',
        flexDirection: 'row',
        flex: 1,
    },
    cardRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingTop: 5,
        paddingBottom: 2,
        paddingLeft: 10,
        paddingRight: 10,
    },
    setsList: {
        backgroundColor: '#fff',
    },
    exerciseText: { 
        fontSize: 20,
        color: '#333',
    },
    equipmentTypeText: {
        fontSize: 20,
        color: '#00adf5',
    },
    muscleGroupText: {
        fontSize: 20,
        color: '#333',
    },

    //Buttons
    buttonRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }, 
    buttonView: {
        paddingTop: 15,
        paddingBottom: 15,
        height: 80,
        width: '45%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        height: '100%',
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#00adf5',
        justifyContent: 'center',
    }
});
