import React,{ Component } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    StatusBar,
    Platform
} from 'react-native';
import BottomBar from '../components/BottomBar';

export default class FeedScreen extends React.Component {

    render() {
        return (
            <View>
                <Text>feed Screen</Text>
                <BottomBar navigation={this.props.navigation}/>
            </View>
            
        );
    }
}
