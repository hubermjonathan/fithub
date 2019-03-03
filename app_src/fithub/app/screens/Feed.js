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
    Alert,
    RefreshControl
} from 'react-native';
import BottomBar from '../components/BottomBar';
import { Button, Icon, Input } from 'react-native-elements';
import WorkoutCard from '../components/WorkoutCard';
import Spinner from 'react-native-loading-spinner-overlay';
import { postLog, getLogs } from '../lib/LogFunctions';

export default class FeedScreen extends React.Component {

    state = {
        show: false,

        fetchedWorkouts: [],
        spinner: false,
        refresh: false
    }


    getCurrentDate() {
        let date = new Date();
        return date.toJSON().slice(0, 10);
    }


    showSpinner = () => {
        this.setState({ spinner: !this.state.spinner });
    }

    hideRefresh = () => {
        this.setState({ refresh: false });
    }

    componentDidMount() {
        this.showSpinner();
        getLogs(this.state.fetchedWorkouts);
        setTimeout(() => {
            this.setState({
                spinner: false
            });
        }, 800);
    }

    onRefresh = () => {
        this.setState({ refresh: true });
        this.state.fetchedWorkouts = [];
        getLogs(this.state.fetchedWorkouts);
        setTimeout(() => {
            this.setState({refresh:false});
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
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refresh}
                                onRefresh={this.onRefresh}
                            />
                        }>
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
                                                text: 'No',
                                                style: 'cancel'
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
                                                text: 'No',
                                                style: 'cancel'
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
