import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    StatusBar,
    Platform,
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native';
import BottomBar from '../components/BottomBar';
import { Button, Icon, Input } from 'react-native-elements';
import WorkoutCard from '../components/WorkoutCard';
import Spinner from 'react-native-loading-spinner-overlay';

export default class FeedScreen extends React.Component {

    state = {
        show: false,

        fetchedWorkouts: [],
        spinner: false



    }
    getSavedWorkouts() {
        fetch('https://fithub-server.herokuapp.com/logs/5c6f8e6798100706844fa981', {
            method: 'GET',
            header: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json())
            .then((res) => {
                let stringify = JSON.stringify(res);
                console.log(stringify);
                let parsed = JSON.parse(stringify);
                for (let x = 0; x < parsed.logs.length; x++) {
                    this.state.fetchedWorkouts.push(parsed.logs[x]);
                }
                console.log(this.state.fetchedWorkouts);

            })
            .catch(function (e) {
                console.log(e);
            });
    }

    postWorkoutToLog(workout) {
        fetch('https://fithub-server.herokuapp.com/logs/new', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(workout)
        }).then(res => res.json())
            .then((res) => console.log('Success', JSON.stringify(res)))
            .catch(function (e) {
                console.log('Error');
            });
    }

    showText = () => {
        this.setState({ show: !this.state.show });
    }

    showSpinner = () => {
        this.setState({ spinner: !this.state.spinner });
    }

    componentDidMount() {
        this.showSpinner();
        this.getSavedWorkouts();
        setInterval(() => {
            this.setState({
                spinner: false
            });
        }, 3000);

        this.showText();
        //this.showSpinner();
    }
    render() {
        if (Platform.OS == 'ios') {
            return (

                <SafeAreaView style={{ flex: 1 }}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Loading...'}

                    />
                    <ScrollView>
                        {this.state.fetchedWorkouts.map((val, index) => {
                            //return (<Text key={index}>{val.name}</Text>);
                            return (
                                <TouchableOpacity key={index}
                                    onPress={() => {
                                        Alert.alert(
                                            'Confirmation',
                                            'Are you sure you want to log this workout?',
                                            [{
                                                text: 'Yes',
                                                onPress: () => this.postWorkoutToLog({
                                                    token: 'abcd',
                                                    uid: '104737446149074205541',
                                                    name: val.name,
                                                    date: val.date,
                                                    exercises: val.exercises,
                                                    id: '5c6f63c51c9d440000000347',
                                                    likes: 0
                                                }),
                                                style: 'cancel'
                                            },
                                            {
                                                text:'No',
                                                style:'cancel'
                                            }]
                                        );
                                    
                                    }}>
                                    <WorkoutCard
                                        name={val.name}
                                        sets={val.exercises}
                                        reps={val.exercises}
                                        
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </SafeAreaView>
            );
        }
        else {
            return (
                <View>
                   <Spinner
                        visible={this.state.spinner}
                        textContent={'Loading...'}

                    />
                    <ScrollView>
                        {this.state.fetchedWorkouts.map((val, index) => {
                            //return (<Text key={index}>{val.name}</Text>);
                            return (
                                <TouchableOpacity key={index}
                                    onPress={() => {
                                        Alert.alert(
                                            'Confirmation',
                                            'Are you sure you want to log this workout?',
                                            [{
                                                text: 'Yes',
                                                onPress: () => this.postWorkoutToLog({
                                                    token: 'abcd',
                                                    uid: '104737446149074205541',
                                                    name: val.name,
                                                    date: val.date,
                                                    exercises: val.exercises,
                                                    id: '5c6f63c51c9d440000000347',
                                                    likes: 0
                                                }),
                                                style: 'cancel'
                                            },
                                            {
                                                text:'No',
                                                style:'cancel'
                                            }]
                                        );
                                    
                                    }}>
                                    <WorkoutCard
                                        name={val.name}
                                        sets={val.exercises}
                                        reps={val.exercises}
                                        
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            );
        }
    }
}
