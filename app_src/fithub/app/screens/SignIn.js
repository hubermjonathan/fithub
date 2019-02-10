import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, SrollView } from 'react-native';
import { Icon } from 'react-native-elements';

export default class SignIn extends Component {

    render() {
        <ScrollView style={styles.scroll}>
            {/*HEADER: FitHub logo*/}
            <View style={styles.header}>
                <Container>
                    <Image 
                        source={require('asset:/FitHub-transparent.png')} 
                        style={styles.image}
                    />
                </Container>
            </View>
            {/*HEADING: Login*/}
            <Container>
                <Label 
                    text="Login"
                    style={styles.heading}
                />
            </Container>  
            {/*ROW: Login-Logo | Username-Dialog-Box*/}
            <View style={styles.row}>
                <Container>
                    <Icon 
                        name='account_circle' 
                        style={styles.icon}
                    />
                </Container>
                <Container>
                    <TextInput
                        placeholder='Username'
                        secureTextEntry={false}
                        style={styles.textInput}
                    />
                </Container>
            </View>
            {/*ROW: Password-Logo | Password-Dialog-Box*/}
            <View style={styles.row}>
                <Container>
                    <Icon 
                        name='lock' 
                        style={styles.icon}
                    />
                </Container>
                <Container>
                    <TextInput
                        placeholder='Password'
                        secureTextEntry={true}
                        style={styles.textInput}
                    />
                </Container>
            </View>
            {/*BUTTON: Login Button*/}
            <View styles={{width: 100, padding: 10}}>
                <Button
                    label="Login"
                    styles={styles.button}
                    onPress={this.press.bind(this)}
                />
            </View>
            {/*CREATE ACCOUNT: Text prompt with link to create an account*/}
            <Container>
                <Text style={{fontSize: 20}}>
                    New to FitHub? No problem!
                </Text>
                <Text 
                    style={{fontSize: 20, fontWeight: 'bold', color: 'blue'}}
                    onPress={this.press.bind(this)}
                > 
                    Register for an account
                </Text>
            </Container>       
        </ScrollView>
    }

}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: 'E1D7D8',
        padding: 30,
        flexDirection: 'column'
    },
    label: {
        color: '#0d8898',
        fontSize: 20
    },

    alignRight: {
        alignSelf: 'flex-end'
    },

    button: {
        color: '#05a5d1',
    },
    textInput: {
        height: 80,
        fontSize: 30,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: '#FFF',
        placeholderTextColor: 'gray'
    },
    image: {
        width: 40,
        height: 40
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    }
});