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
    Alert
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Container, Header, Content, Footer, Title } from 'native-base';
import BottomBar from '../components/BottomBar';

export default class AddWorkoutScreen extends React.Component {

    state = {
        modalVisible: false,
        workoutName: "",
        description: "",
        exercises: [],

        exerciseName: "",
        sets: 0,
        reps: 0,

        correct: false
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ padding: 50 }}>
                        <View style={styles.center}>
                            <Text style={styles.centerText}>Workout Name</Text>
                            <TextInput
                                style={styles.input}
                                clearButtonMode='while-editing'
                                defaultValue='e.g "The Dorito"'
                                selectTextOnFocus={true}
                                onChangeText={(text) => this.setState({ workoutName: text })} />
                            <Text>{this.state.workoutName}</Text>
                        </View>
                        <View style={styles.center}>
                            <Text style={styles.centerText}>Description</Text>
                            <TextInput
                                style={styles.input}
                                clearButtonMode='while-editing'
                                selectTextOnFocus={true}
                                onChangeText={(text) => this.setState({ description: text })} />
                            <Text>{this.state.description}</Text>
                        </View>

                        <Modal
                            animationType="fade"
                            transparent={false}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                            }}
                            style={{ flex: 1 }}>
                            <ScrollView>
                                <View style={{ marginTop: 22, paddingBottom: 20 }}>
                                    <View style={styles.centerE}>
                                        <Button
                                            style={{ paddingBottom: 50 }}
                                            title="cancel"
                                            onPress={() => {
                                                this.setModalVisible(false);
                                                this.setState({ exerciseName: "" });
                                                this.setState({ exerciseDescription: "" });
                                                this.setState({ sets: 0 });
                                                this.setState({ reps: 0 });
                                            }} />
                                        <Text style={styles.centerText}> Exercise Name</Text>
                                        <TextInput
                                            style={styles.input}
                                            clearButtonMode='while-editing'
                                            defaultValue='e.g "Hammer Curls"'
                                            selectTextOnFocus={true}
                                            onChangeText={(text) => this.setState({ exerciseName: text })} />
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
                                            onChangeText={(text) => this.setState({ reps: parseInt(text) })} />
                                    </View>
                                </View>
                            </ScrollView>
                            <View>
                                <Button title='submit'
                                    onPress={() => {
                                        if (typeof this.state.sets === "number" && typeof this.state.reps === "number" && this.state.exerciseName.length > 0) {
                                            let exerciseObj = {
                                                name: this.state.exerciseName,
                                                sets: this.state.sets,
                                                reps: this.state.reps,
                                                ownerUID: 0 //dont know how to get userid for now
                                            }
                                            this.state.exercises.push(exerciseObj);
                                            this.setModalVisible(false);
                                            this.setState({ exerciseName: "" });
                                            this.setState({ sets: 0 });
                                            this.setState({ reps: 0 });
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
                        </Modal>

                        <Button
                            style={{ paddingBottom: 40 }}
                            title="Add Exercise"
                            color='blue'
                            onPress={() => {
                                this.setModalVisible(true);
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
                                this.postCustomWorkout({ workoutName: this.state.workoutName, description: this.state.description, exercises: this.state.exercises });
                            }}
                        />
                    </View>
                </ScrollView>
                <View>
                    <BottomBar navigation={this.props.navigation} />
                </View>

            </View >

        );
    }


    /*posts workout data to server*/
    postStandardWorkout(workout) {
        fetch('/workouts/new', {
            method: 'POST',
            body: JSON.stringify(workout)
        }).then(res => res.json())
            .then((res) => console.log('Success', JSON.stringify(res)))
            .catch(function (e) {
                console.log('Error');
            });
    }

    /*could delete this later since it's identical to first one*/
    postCustomWorkout(workout) {
        fetch('/workouts/new', {
            method: 'POST',
            body: JSON.stringify(workout)
        }).then(res => res.json())
            .then((res) => console.log('Success', JSON.stringify(res)))
            .catch(function (e) {
                console.log('Error');
            });
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


});
