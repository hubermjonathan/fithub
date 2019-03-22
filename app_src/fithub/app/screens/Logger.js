//React library / component imports
import React from 'react';
import { View, SafeAreaView, Text, TextInput, StyleSheet, Platform, FlatList, Modal, Button, TouchableHighlight, Alert } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from 'react-navigation';

//Redux imports
import { connect } from 'react-redux';
//Custom components
import LogCard from '../components/LogCard';


class Logger extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles.page}>
                <View>
                    <FlatList
                        data={this.props.workout.exercises} 
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.list}
                        renderItem={(exercise, index) => 
                            <View style={styles.card}>
                            <LogCard
                                exercise={exercise.item}
                                dispatch={this.props.dispatch}
                                index={exercise.index}
                            />
                        </View>}
                    />
                </View>
            </View>
        );
    }
}


class LoggerScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: 'Workout',
          headerRight: <Icon name="add" type="material" size={35} onPress={() => {navigation.push('SelectExercises')} } />
        }
    };

    render() {
        //console.log("State: ", this.props);
        return(
            <Logger 
                workout={this.props.workout}
                dispatch={this.props.dispatch}
            />
        );
    }
}
export default connect((state)=> { return {workout: state.workout}})(LoggerScreen);

const styles = StyleSheet.create({
    page: {
        width: '100%',
        backgroundColor: '#f4f4f4',
        alignItems: 'stretch',           
        
    },
    list: {
    },
    modal: {
        marginTop: '5%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    modalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 5,
    },
    modalTextInput: {
        flex: 1,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
});

