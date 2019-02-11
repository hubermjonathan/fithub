import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, ScrollView, Image, Label, Button, Flexbox, Container, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SignIn extends Component {

    press() {
        Console.log('Button Pressed');
    }

    render() {
        return(
                <View style={{flex: 3, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                    {/*HEADER: FitHub logo*/}
                    <View style={styles.header}>
                            <Image 
                                source={require('../../assets/FitHub-transparent.png')}
                                style={styles.image}
                            />
                    </View>
                    {/*HEADING: Login*/}
                    <View>
                        <Text style={styles.heading}>
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
                                size={30}
                            />

                            <View style={{padding: 5}}>
                            </View>
                            
                            <TextInput
                                placeholder='Username'
                                placeholderTextColor= 'gray'
                                secureTextEntry={false}
                                style={styles.textInput}
                            />
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
                    </View>
                    {/*BUTTON: Login Button*/}
                    <View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.press.bind(this)}
                        >
                            <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    {/*CREATE ACCOUNT: Text prompt with link to create an account*/}
                    <View>
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
    heading: {
        fontSize: 40,
        padding: 20,
    },

    alignRight: {
        alignSelf: 'flex-end'
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

    header: {
        height: 200,
        width: 300,
        padding: 30
        
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'contain'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
});