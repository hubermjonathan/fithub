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
import {postLog} from '../lib/LogFunctions';

export default class FeedScreen extends React.Component {

    state = {
        show: false,

        fetchedWorkouts: [],
        spinner: false



    }
    getLogWorkouts() {
        fetch('https://fithub-server.herokuapp.com/logs/5c6f8e6798100706844fa981', {
            method: 'GET',
            header: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json())
            .then((res) => {
                let stringify = JSON.stringify(res);
                let parsed = JSON.parse(stringify);
                for (let x = 0; x < parsed.data.logs.length; x++) {
                    this.state.fetchedWorkouts.push(parsed.data.logs[x]);
                }
               // console.log(this.state.fetchedWorkouts);

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
    getCurrentDate() {
        let date = new Date();
        return date.toJSON().slice(0, 10);
      }


    showSpinner = () => {
        this.setState({ spinner: !this.state.spinner });
    }

    componentDidMount() {
        this.showSpinner();
        this.getLogWorkouts();
        setInterval(() => {
            this.setState({
                spinner: false
            });
        }, 800);

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
                                                onPress: () => postLog({
                                                    token: '',
                                                    uid: '',
                                                    name: val.name,
                                                    date: val.date,
                                                    exercises: val.exercises,
                                                    id: '',
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
                                        exercises={val.exercises}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                    <Button
                        title={'refresh'}
                        onPress={()=>{
                            this.setState({fetchedWorkouts:[]});
                            this.componentDidMount();
                        }}
                    />
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
                                                    token: '',
                                                    uid: '',
                                                    name: val.name,
                                                    date: val.date,
                                                    exercises: val.exercises,
                                                    id: '',
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
