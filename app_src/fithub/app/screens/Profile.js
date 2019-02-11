import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    StatusBar
}from 'react-native';
import { createStackNavigator, createAppContainer} from 'react-navigation';


class Profile extends React.Component {
    render() {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Profile</Text>
          </View>
        );
      }
}