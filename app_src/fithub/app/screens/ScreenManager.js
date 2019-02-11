import React,{ Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import SignIn from './SignIn';
import Register from './Register';

import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator({
  Register: {screen: Register},
  SignIn: {screen: SignIn},
});

const App = createAppContainer(MainNavigator);

export default App;
