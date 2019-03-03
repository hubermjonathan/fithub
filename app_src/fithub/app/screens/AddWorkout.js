import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    StatusBar,
    Platform,
    TextInput,
    Modal,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView,
    Alert,
    Switch,
    KeyboardAvoidingView
} from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { InputAutoSuggest } from 'react-native-autocomplete-search';
import BottomBar from '../components/BottomBar';
import { postWorkout } from '../lib/WorkoutFunctions'
import WorkoutCard from '../components/WorkoutCard';

export default class AddWorkoutScreen extends React.Component {



    state = {
        modalVisible: false,
        swmodalVisible: false,
        workoutName: "",
        description: "",
        exercises: [],

        exerciseName: "",
        sets: 0,
        warmupSets: 0,
        reps: [],
        warmup: [],
        exerciseNames: [],

        savedWorkouts: [],

        show: false



    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    setswModalVisible(visible) {
        this.setState({ swmodalVisible: visible })
    }

    getCurrentDate() {
        let date = new Date();
        return date.toJSON().slice(0, 10);
    }

    showText = () => {
        this.setState({ show: true });
    }



    render() {


        return (

            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <View style={{ padding: '15%', marginTop: '20%' }}>
                            <View style={styles.center}>
                                {/*Workout Name prompt */}
                                <Text style={styles.centerText}>Workout Name</Text>
                                <TextInput
                                    style={styles.input}
                                    clearButtonMode='while-editing'
                                    defaultValue='e.g "The Dorito"'
                                    selectTextOnFocus={true}
                                    onChangeText={(text) => this.setState({ workoutName: text })} />
                                {/*Description prompt */}
                                <Text style={styles.centerText}>Description</Text>
                                <TextInput
                                    style={styles.input}
                                    clearButtonMode='while-editing'
                                    selectTextOnFocus={true}
                                    onChangeText={(text) => this.setState({ description: text })} />
                            </View>

                            {/*Modal for adding custom exercise */}
                            <Modal
                                animationType="fade"
                                transparent={false}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                }}
                                style={{ flex: 1 }}>
                                <SafeAreaView style={{ flex: 1 }}>
                                    {/* <ScrollView> */}
                                        <View style={{ marginTop: '25%', paddingBottom: 20 }}>
                                            <View style={styles.centerE}>

                                                <Text style={styles.centerText}> Exercise Name</Text>
                                                <TextInput
                                                    style={styles.input}
                                                    clearButtonMode='while-editing'
                                                    defaultValue='e.g "Hammer Curls"'
                                                    selectTextOnFocus={true}
                                                    onChangeText={(text) => this.setState({ exerciseName: text })} />
                                                <Text style={styles.centerText}> # of Warmup Sets</Text>
                                                <TextInput
                                                    style={styles.input}
                                                    clearButtonMode='while-editing'
                                                    defaultValue='e.g "5"'
                                                    selectTextOnFocus={true}
                                                    keyboardType="number-pad"
                                                    onChangeText={(text) => this.setState({ warmupSets: parseInt(text) })} />
                                                <Text style={styles.centerText}> # of Sets</Text>
                                                <TextInput
                                                    style={styles.input}
                                                    clearButtonMode='while-editing'
                                                    defaultValue='e.g "5"'
                                                    selectTextOnFocus={true}
                                                    keyboardType="number-pad"
                                                    onChangeText={(text) => this.setState({ sets: parseInt(text) })} />
                                                <Text style={styles.centerText}> # of Reps</Text>
                                                <TextInput
                                                    style={styles.input}
                                                    clearButtonMode='while-editing'
                                                    defaultValue='e.g "5"'
                                                    selectTextOnFocus={true}
                                                    keyboardType="number-pad"
                                                    onChangeText={(text) => {
                                                        let repsArr = [];
                                                        for (let x = 0; x < this.state.sets + this.state.warmupSets; x++) {
                                                            repsArr.push(parseInt(text));
                                                        }
                                                        this.setState({ reps: repsArr })
                                                    }
                                                    } />
                                            </View>
                                        </View>
                                    {/* </ScrollView> */} 
                                    {/*Cancel and Add buttons */}
                                    <View style={{ padding: '1%' }}>
                                        <Button
                                            style={{ paddingBottom: '1%' }}
                                            buttonStyle={{ backgroundColor: '#e04a21' }}
                                            title="Cancel"
                                            onPress={() => {
                                                this.setModalVisible(false);
                                                this.setState({ exerciseName: "" });
                                                this.setState({ sets: 0 });
                                                this.setState({ warmpupSets: 0 });
                                                this.setState({ reps: [] });
                                                this.setState({ warmup: false });
                                            }} />
                                        <Button
                                            style={{ paddingBottom: 5 }}
                                            title='Add'
                                            onPress={() => {
                                                if (typeof this.state.sets === "number" && this.state.reps.length > 0 && this.state.exerciseName.length > 0) {
                                                    let warmupObj = [];
                                                    for (let x = 0; x < this.state.warmupSets; x++) {
                                                        warmupObj.push(true);
                                                    }
                                                    for (let x = this.state.warmupSets; x < this.state.warmupSets + this.state.sets; x++) {
                                                        warmupObj.push(false);
                                                    }
                                                    let exerciseObj = {
                                                        name: this.state.exerciseName,
                                                        reps: this.state.reps,
                                                        warmup: this.state.warmup
                                                    }
                                                    this.state.exercises.push(exerciseObj);
                                                    this.setState({ name: "" });
                                                    this.setState({ sets: 0 });
                                                    this.setState({ warmpupSets: 0 });
                                                    this.setState({ reps: [] });
                                                    this.setState({ savedWorkouts: [] });
                                                    this.setState({ warmup: [] });

                                                    this.setModalVisible(false);

                                                }
                                                else {
                                                    Alert.alert(
                                                        'Error',
                                                        'Please try again',
                                                        {
                                                            text: 'Ok',
                                                            style: 'cancel'
                                                        }
                                                    );
                                                }
                                            }} />
                                    </View>
                                </SafeAreaView>
                            </Modal>


                            <Button
                                style={{ paddingBottom: 40 }}
                                title="Add Exercise"
                                color='blue'
                                onPress={() => {
                                    this.setModalVisible(true);
                                    if (this.state.exerciseNames.length == 0) {
                                        //this.getExercises();
                                    }
                                }} />
                            <Button
                                titleStyle={{ fontSize: 30, color: 'white' }}
                                icon={
                                    <Icon
                                        name="check"
                                        type="entypo"
                                        size={40} />
                                }
                                iconRight
                                onPress={() => {
                                    if (this.state.workoutName == 'e.g "The Dorito"' || this.state.workoutName == ""){
                                        Alert.alert(
                                            'Error',
                                            'You must have a name for your workout!',
                                            {
                                                text: 'Ok',
                                                style: 'cancel'
                                            }
                                        );
                                    }
                                    else if (this.state.exercises.length > 0) {
                                        postWorkout(
                                            {
                                                token: '',
                                                uid: '',
                                                name: this.state.workoutName,
                                                date: this.getCurrentDate(),
                                                description: this.state.description,
                                                exercises: this.state.exercises,
                                                id: '',
                                                likes: 0
                                            }
                                        );
                                        Alert.alert(
                                            'Success',
                                            'Workout has been added!',
                                            {
                                                text: 'Ok',
                                                style: 'cancel'
                                            }
                                        );
                                        this.setState({ exercises: [] });

                                    }
                                    else {
                                        Alert.alert(
                                            'Error',
                                            'You must add at least 1 exercise!',
                                            {
                                                text: 'Ok',
                                                style: 'cancel'
                                            }
                                        );
                                        //console.log(this.state.exerciseNames);
                                    }
                                }}
                            />
                        </View>
                    </ScrollView>
                </View >
            </SafeAreaView>
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
        padding: '2%',
        color: 'grey'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '10%'
    },
    centerE: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '10%',

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
    bottomBar: {
        justifyContent: 'flex-end',
    }

});