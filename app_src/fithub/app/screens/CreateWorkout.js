import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Alert,
    FlatList,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import SelectExercisesScreen from './SelectExercises';
import { Button } from 'react-native-elements';

export default class CreateWorkoutScreen extends React.Component {

    //PROPS SHOULD CONTAIN RELEVANT DATA IN ORDER TO ACCESS WORKOUT IN DATABASE.
    //EXERCISES CREATED HERE WILL BE SENT TO SERVER IN REAL TIME
    constructor(props) {
        super(props);
    }
    /*state = {
        workoutName,
    };*/

    componentWillMount() {
        this.setState({
        });
    }

    static navigationOptions = {
        //title: 'Create A Custom Workout'
    }

    render() {
        return (
            <View style={styles.page}>
                <ScrollView>
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <Text style={styles.headingText}>
                                Create A Custom Workout
                            </Text>
                        </View>
                        <View style={styles.dialog}>
                            <Text style={styles.subheadingText}>
                                Workout Name
                            </Text>
                            <TextInput
                                style={styles.textInput}
                                clearButtonMode='while-editing'
                                defaultValue='e.g "The Dorito"'
                                selectTextOnFocus={true}
                                onChangeText={(text) => this.setState({ exerciseName: text })}
                            />
                        </View>
                        <View style={styles.dialog}>
                            <Text style={styles.subheadingText}>
                                Add Exercises
                            </Text>                            
                            
                        </View>
                        <View style={styles.SelectExercises}>
                            <SelectExercisesScreen />
                        </View>
                        <View style={styles.button}>
                            <Button
                                title= 'Create'
                                onPress={this._onSubmitWorkout}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    _onSubmitWorkout() {
        //If exerciseName or equipmentType is null
        if (this.state.workoutName === undefined) {
            Alert.alert(
                'Error',
                'Please specify a valid exercise name and equipment type',
                [
                    {text: 'OK', onPress: () => {}}
                ]
            )
            return;
        }
        
        var body = `Would you like to create the custom exercise '${this.exerciseName}'?`
        Alert.alert(
            'Exercise',
            body,
            [
                //Buttons are in the order: (Neutral), Negative, Positive
                {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                {text: 'Yes', onPress: () => { this._postExerciseToAccount() }},
            ]
        );
    }

    _postExerciseToAccount() {
        
    }
}
const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    content: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
        //paddingBottom: 15
    },
    header: {
    },
    headingText: {
        textAlign: 'center',
        fontFamily: 'System',
        fontSize: 30,
        color: 'grey'
    },
    dialog: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 25
    },
    subheadingText: {
        textAlign: 'center',
        fontFamily: 'System',
        fontSize: 24,
        color: 'grey'
    },
    textInput: {
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
    SelectExercises: {
        flex: .4,
        alignItems: 'center',
        padding: 10,
    },
    button: {
        alignItems: 'center',
        padding: 15,
        fontFamily: 'System'
    },
});
