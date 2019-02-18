import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    StatusBar,
    Platform,
    TextInput,
    Modal,
    TouchableHighlight,
    TouchableOpacity,
    Button
} from 'react-native';
import BottomBar from '../components/BottomBar';

export default class AddWorkoutScreen extends React.Component {
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }


    render() {
        let customWorkout = {};
        return (
            <View>
                <View style={{ top: 80 }}>
                    <View style={styles.center}>
                        <Text style={styles.centerText}>Workout Name</Text>
                        <TextInput
                        style={styles.input}
                        clearButtonMode='while-editing'
                        defaultValue='e.g "The Dorito"' 
                        selectTextOnFocus = {true}/>
                    </View>
                    <View style={styles.center}>
                        <Text style={styles.centerText}>Description</Text>
                        <TextInput 
                        style={styles.input} 
                        clearButtonMode='while-editing'
                        defaultValue='"low gravity day"' 
                        selectTextOnFocus = {true}/>
                    </View>

                    <Modal
                        animationType="fade"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={{ marginTop: 22 }}>
                            <View style={styles.center}>
                            <Button 
                                style={styles.cancel}
                                title="cancel"
                                onPress={() => { this.setModalVisible(false) }}>
                            </Button>
                                <Text sytle={{fontSize:18}}> Exercise Name</Text>
                                <TextInput 
                                style={styles.input} 
                                clearButtonMode='while-editing'/>
                            </View>
                        </View>
                    </Modal>
                    <Button 
                        style={styles.buttonText}
                        title="Add Exercise"
                        onPress={() => {
                            this.setModalVisible(true);
                        }}>
                    </Button>
                </View>

                <View style={styles.bottomBar}>
                    <BottomBar navigation={this.props.navigation}/>
                </View>
            </View>


        );
    }


    /*posts workout data to server*/
    postStandardWorkout(workout) {
        fetch('/workouts/new', {
            method: 'POST',
            body: JSON.stringify(workout)
        }).then(res => res.json())
            .then((res) => console.log('Success', JSON.stringify(res)))
            .catch(function (e) {
                console.log('Error');
            });
    }

    /*could delete this later since it's identical to first one*/
    postCustomWorkout(workout) {
        fetch('/workouts/new', {
            method: 'POST',
            body: JSON.stringify(workout)
        }).then(res => res.json())
            .then((res) => console.log('Success', JSON.stringify(res)))
            .catch(function (e) {
                console.log('Error');
            });
    }

}
const styles = StyleSheet.create({
    input: {
        borderColor: 'grey',
        borderWidth: 4,
        borderRadius: 50,
        width: 300,
        textAlign: 'center',
        fontFamily: 'System',
        fontSize: 18,
        padding: 5,
        color: 'grey'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15
    },
    centerText: {
        textAlign: 'center',
        fontFamily: 'System',
        fontSize: 20,
        color: 'grey'
    },
    buttonText:{
        fontFamily:'System'
    },
    cancel:{
        
    },
    bottomBar: {
        justifyContent: 'flex-end',
    }

});
