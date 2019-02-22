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

export default class CreateWorkoutScreen extends React.Component {

    //PROPS SHOULD CONTAIN RELEVANT DATA IN ORDER TO ACCESS WORKOUT IN DATABASE.
    //EXERCISES CREATED HERE WILL BE SENT TO SERVER IN REAL TIME
    constructor(props) {
        super(props);
    }
    /*state = {
        exerciseName,
        equipmentType,
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
                            <Text style={styles.subheadingHext}>
                                Workout Name
                            </Text>
                            <TextInput
                                style={styles.textInput}
                                clearButtonMode='while-editing'
                                defaultValue='e.g "Bench Press"'
                                selectTextOnFocus={true}
                                onChangeText={(text) => this.setState({ exerciseName: text })}
                            />
                        </View>
                        <View style={styles.dialog}>
                            <Text style={styles.subheadingHext}>
                                Add Exercises
                            </Text>                            
                            <SelectExercisesScreen />
                        </View>
                        <View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={this._onSubmitExercise}
                            >
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    _onSubmitExercise() {
        //If exerciseName or equipmentType is null
        if (this.state.exerciseName === undefined || this.state.equipmentType === undefined) {
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margintop: 20
        //paddingBottom: 15
    },
    header: {
    },
    headingText: {
        textAlign: 'center',
        fontFamily: 'System',
        fontSize: 24,
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
        fontSize: 20,
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
    button: {
        alignItems: 'center',
        backgroundColor: 'blue',
        padding: 10,
    },
    buttonText: {
        fontFamily: 'System'
    },
});
