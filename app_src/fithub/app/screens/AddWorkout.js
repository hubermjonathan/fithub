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
    Switch
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Container, Header, Content, Footer, Title } from 'native-base';
import BottomBar from '../components/BottomBar';
import { postStandardWorkout, postCustomWorkout } from '../lib/WorkoutFunctions'

export default class AddWorkoutScreen extends React.Component {

    state = {
        modalVisible: false,
        workoutName: "",
        description: "",
        exercises: [],

        exerciseName: "",
        sets: 0,
        warmupSets: 0,
        reps: [],
        warmup: [],
        exerciseNames: []

    };

    static navigationOptions = {
        header: null,
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }


    render() {
        function getExercises() {
            fetch('https://fithub-server.herokuapp.com/exercises', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => res.json())
                .then((res) => {
                    console.log('Success', JSON.stringify(res));
                    this.setState({exerciseNames:JSON.parse(res)});
            
                })
                .catch(function (e) {
                    console.log('Error');
                });
        }

        

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <View style={{ padding: '15%', marginTop: '20%' }}>
                            <View style={styles.center}>
                                <Text style={styles.centerText}>Workout Name</Text>
                                <TextInput
                                    style={styles.input}
                                    clearButtonMode='while-editing'
                                    defaultValue='e.g "The Dorito"'
                                    selectTextOnFocus={true}
                                    onChangeText={(text) => this.setState({ workoutName: text })} />
                            </View>
                            <View style={styles.center}>
                                <Text style={styles.centerText}>Description</Text>
                                <TextInput
                                    style={styles.input}
                                    clearButtonMode='while-editing'
                                    selectTextOnFocus={true}
                                    onChangeText={(text) => this.setState({ description: text })} />
                            </View>

                            <Modal
                                animationType="fade"
                                transparent={false}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                }}
                                style={{ flex: 1 }}>
                                <SafeAreaView style={{ flex: 1 }}>
                                    <ScrollView>

                                        <View style={{ marginTop: '25%', paddingBottom: 20 }}>
                                            <View style={styles.centerE}>

                                                <Text style={styles.centerText}> Exercise Name</Text>
                                                <TextInput
                                                    style={styles.input}
                                                    clearButtonMode='while-editing'
                                                    defaultValue='e.g "Hammer Curls"'
                                                    selectTextOnFocus={true}
                                                    onChangeText={(text) => this.setState({ exerciseName: text })} />
                                            </View>
                                            <View style={styles.centerE}>
                                                <Text style={styles.centerText}> # of Warmup Sets</Text>
                                                <TextInput
                                                    style={styles.input}
                                                    clearButtonMode='while-editing'
                                                    defaultValue='e.g "5"'
                                                    selectTextOnFocus={true}
                                                    keyboardType="number-pad"
                                                    onChangeText={(text) => this.setState({ warmupSets: parseInt(text) })} />
                                            </View>
                                            <View style={styles.centerE}>
                                                <Text style={styles.centerText}> # of Sets</Text>
                                                <TextInput
                                                    style={styles.input}
                                                    clearButtonMode='while-editing'
                                                    defaultValue='e.g "5"'
                                                    selectTextOnFocus={true}
                                                    keyboardType="number-pad"
                                                    onChangeText={(text) => this.setState({ sets: parseInt(text) })} />
                                            </View>
                                            <View style={styles.centerE}>
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
                                    </ScrollView>
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
                                                    this.setModalVisible(false);

                                                }
                                                else {
                                                    Alert.alert(
                                                        'Error',
                                                        'Please try again',
                                                        {
                                                            text: 'Ok',
                                                            onPress: () => console.log('alert Pressed'),
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
                                    getExercises();
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
                                    postCustomWorkout({ name: this.state.workoutName, date: '2019-02-25', description: this.state.description, exercises: this.state.exercises, uid: '104737446149074205541', likes: 0 });
                                    this.setState({ exercises: [] });
                                }}
                            />
                        </View>
                    </ScrollView>
                    <View>
                        <BottomBar navigation={this.props.navigation} />
                    </View>
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
