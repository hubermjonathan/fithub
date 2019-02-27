import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { logInToGoogle } from '../lib/AccountFunctions';

export default class SignInScreen extends Component {
//PROPS:
//signIn: a function passed to handle pressing the "Sign in with Google" button

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
                        <TouchableOpacity onPress={this.props.signIn}>
                            <Image
                                source={require('../../assets/sign-in-with-google.png')}
                                style={styles.buttonImage}
                            />
                        </TouchableOpacity>
                    </View>
            </View>   
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'center', 
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
