import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, ScrollView, Image, Label, Button, Flexbox, Container, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SignIn extends Component {

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
                                style={styles.image}
                            />
                    </View>
                    {/*CONTENT:  Login details*/}
                    <View style={styles.content}>
                        {/*HEADING: Login*/}
                        <View style={styles.heading}>
                            <Text style={styles.headingText}>
                                Login
                            </Text> 
                        </View>  
                        {/*ROW: Login-Logo | Username-Dialog-Box*/}
                        <View style={styles.row}>
                            <View style={{padding: 5}}>
                            </View>

                            <Icon 
                                name='user-circle' 
                                type='font-awesome'
                                size={20}
                            />

                            <View style={{padding: 5}}>
                            </View>
                            
                            <TextInput
                                placeholder='Username'
                                placeholderTextColor= 'gray'
                                secureTextEntry={false}
                                style={styles.textInput}
                            />

                            <View style={{padding: 5}}>
                            </View>
                        </View>

                        <View style={{padding: 3}}>
                        </View>

                        {/*ROW: Password-Logo | Password-Dialog-Box*/}
                        <View style={styles.row}>
                            <View style={{padding: 5}}>
                            </View>

                            <Icon 
                                name='lock' 
                                type='font-awesome'
                                size={30}
                            />

                            <View style={{padding: 5}}>
                            </View>

                            <TextInput
                                placeholder='Password'
                                placeholderTextColor= 'gray'
                                secureTextEntry={true}
                                style={styles.textInput}
                            />

                            <View style={{padding: 5}}>
                            </View>
                        </View>
                        {/*BUTTON: Login Button*/}
                        <View style={styles.login}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={this.press.bind(this)}
                            >
                                <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/*FOOTER: Create Account Dialog*/}
                    <View style={styles.footer}>
                        <Text style={{fontSize: 20}}>
                            New to FitHub? No problem!
                        </Text>
                        <Text 
                            style={{fontSize: 20, fontWeight: 'bold', color: 'blue'}}
                            onPress={this.press.bind(this)}
                        > 
                            Register for an account
                        </Text>
                    </View>    
                </View>   
        );
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
        flex: 1,
        justifyContent: 'center',
    },

    content: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },

    footer: {
        flex: 1,
        justifyContent: 'center'
    },

    heading: {
    },

    headingText: {
        fontSize: 40,
        padding: 20,
    },

    login: {
        padding: 20,
    },

    button: {
        alignItems: 'center',
        backgroundColor: '#05a5d1',
        width: 150,
        height: 40,
    },

    textInput: {
        height: 30,
        flex: 2,
        fontSize: 16,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: '#FFF',
    },

    image: {
        width: 200,
        height: 100,
        resizeMode: 'contain'
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    footerText: {

    },

});