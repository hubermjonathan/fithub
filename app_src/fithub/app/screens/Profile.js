import React from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    StatusBar,
    Platform
} from 'react-native';
import BottomBar from '../components/BottomBar';

export default class ProfileScreen extends React.Component {

    render() {
        return (
            <View>
                <Text>Profile Screen</Text>
                <BottomBar />
            </View>
        )
    }
}
