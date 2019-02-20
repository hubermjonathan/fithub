import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { logInToGoogle } from '../lib/AccountFunctions';

export default class SignInScreen extends Component {

    press() {
        Console.log('Button Pressed');
    }

    render() {
        return(
            <View style={styles.page}>
                {/*HEADER: FitHub logo*/}
                <View style={styles.header}>
                    <Image 
                        source={require('../../assets/FitHub-transparent.png')}
                        style={styles.headerImage}
                    />
                </View>
                {/*CONTENT: Login ~ Login With Google*/}
                <View style={styles.content}>
                    {/*HEADING: Login*/}
                    <View style={styles.heading}>
                        <Text style={styles.headingText}>
                            Welcome to FitHub!
                        </Text> 
                        <Text style={styles.subheadingText}>
                            Please sign in to get started
                        </Text>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity onPress={this._handleSignIn}>
                            <Image
                                source={require('../../assets/sign-in-with-google.png')}
                                style={styles.buttonImage}
                            />
                        </TouchableOpacity>
                    </View>
                </View>    
            </View>   
        );
    }

    async _handleSignIn() {
        const result = await logInToGoogle();
        if (result === true) {
            //NAVIGATE TO HOME PAGE HERE
        } else {
            console.log("logInToGoogle() returned false. Unable to log in user")
            Alert.alert(
               'SignIn Error',
               'Google Authentication failed to verify your information. Please try again.',
               [
                   {text: "OK", onPress: () => {}}
               ],
            );
        }
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        alignItems: 'center',
    },
    header: {
        flex: 0,
        justifyContent: 'center',

    },
    headerImage: {
        width: 200,
        height: 100,
        resizeMode: 'contain',
    },
    content: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    heading: {
    },
    headingText: {
        fontSize: 32,
        paddingTop: 5,
        paddingBottom: 5,
    },
    subheadingText: {
        fontSize: 24,
        paddingTop: 3,
        paddingBottom: 3,
    },
    buttonView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
    buttonImage: {
        height: 75,
        width: 300,
    },
});
