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

    // static navigationOptions = ({ navigation }) => {
    //     return {
    //       title: 'Create A Workout',
    //       headerRight: <Icon name="add" type="material" size={35} onPress={() => {navigation.push('SelectWorkout')} } />
    //     }
    // };

    render() {
        return (
            <Text> Hello </Text>
        );
    }





}