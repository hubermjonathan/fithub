import React,{ Component } from 'react';
import React from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    StatusBar,
    Platform
} from 'react-native';
import BottomBar from '../Components/BottomBar';

export default class Profile extends React.Component {

    render() {
        return (
            <View>
                <Text>Profile Screen</Text>
                <BottomBar />
            </View>
        )
    }
}
