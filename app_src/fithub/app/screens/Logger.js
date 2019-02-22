import React from 'react';
import { View, SafeAreaView, Text, TextInput, StyleSheet, Platform, FlatList, Modal, Button } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';

import LogCard from '../components/LogCard';

import { postLog } from '../lib/LogFunctions';

export default class LoggerScreen extends React.Component {

    static navigationOptions = {
        tabBarIcon: <Icon name="add" type="material" size={35} />
    }

    constructor(props) {
        super(props);
        this.state = {
            uid: Workout.uid,
            name: Workout.name,
            exercises: Workout.exercises,

            addSetModalIsVisible: false,
            modalReps: undefined,
            modalWeight: undefined,
            modalWarmup: false,
            arrayIndex: undefined,
        }
    }

    render() {
        //console.log(this.props.navigation);
        return(
            <View style={styles.page}>
                <Modal
                    animationType='fade'
                    transparent={false}
                    visible={this.state.addSetModalIsVisible}
                >   
                    <SafeAreaView>
                        <View style={styles.modal}>
                            <View style={{alignContent: 'center'}}>
                                <Text style={styles.modalText}>New Set</Text>
                            </View>
                            <View style={styles.modalRow}>
                                <TextInput  
                                    style={styles.modalTextInput}
                                    clearButtonMode='while-editing'
                                    placeholder='Reps'
                                    placeholderTextColor='gray'
                                    selectTextOnFocus={true}
                                    keyboardType="number-pad"
                                    onChangeText={(text) => this.setState({ modalReps: text })}
                                />
                                <TextInput  
                                    style={styles.modalTextInput}
                                    clearButtonMode='while-editing'
                                    placeholder='Weight'
                                    placeholderTextColor='gray'
                                    selectTextOnFocus={true}
                                    keyboardType="number-pad"
                                    onChangeText={(text) => this.setState({ modalWeight: text })}
                                />
                            </View>
                            <View style={{alignContent:'center'}}>
                                <CheckBox
                                center
                                title='Warmup'
                                checked={this.state.modalWarmup}
                                onPress={() => this.setState({modalWarmup: !this.state.modalWarmup})}
                                />
                            </View>
                            <View style={{alignContent:'center'}}>
                                <Button
                                onPress={this._modalOK}
                                title="OK"
                                color="#00adf5"
                                />
                            </View>
                        </View>
                    </SafeAreaView>
                </Modal>

                <View style={styles.list}>
                    <FlatList
                        data={this.state.exercises}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => 
                        
                            <View style={styles.card}>
                                <LogCard
                                    uid={item.uid}
                                    exercise={item.name}
                                    equipmentType={item.equipment_type}
                                    muscleGroup={item.muscle_group} 
                                    sets={item.sets}
                                    // addSet={() => this._addSet}
                                    // editSet={this._editSet}
                                    // editExercise={this._editExercise}
                                />
                                <Button
                                    onPress={() => this._handleAddSetButton(index)}
                                    title="Add Set!"
                                    color="#00adf5"
                                />
                            </View>
                        }       
                    />
                </View>
            </View>
        );
    }

    _handleAddSetButton = (index) => {
        this.setState({
            arrayIndex: index,
            addSetModalIsVisible: true
        });
    }

     _modalOK = () => {
        if (this.state.modalReps !== undefined && this.state.modalWeight !== undefined) {
            this.setState(prevState => {
                const updatedExercises = prevState.exercises;
                updatedExercises[this.state.arrayIndex]
                    .sets.push({"weight": this.state.modalWeight, "reps": this.state.modalReps, "warmup": this.state.modalWarmup});
                exercises: updatedExercises
            });

            var Workout = {
                id: '5c6f8e6798100706844fa981',
                uid: '108849574280224972689', //Should be this.state.uid (workout)
                token: 'e498a0841ce3c3ed948e48e9b788dcf620742070304ea327b3bdb0a83d26f37065dac9e611ce0e2d51478655c4007cef',
                description: 'log',
                name: this.state.name,
                exercises: this.state.exercises,
            }
            console.log(Workout);
            const result = postLog(Workout);
        }
        this.setState({
            modalReps: undefined,
            modalWeight: undefined,
            addSetModalIsVisible: false
        });
    }
}

const styles = StyleSheet.create({
    page: {
        marginTop: '3%',
        backgroundColor: '#f4f4f4',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        flexDirection: 'row',
        justifyContent: 'center',
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

const Workout = {
    uid: '12345678910',
    name: 'Chest Day Boi',
    exercises: [
      {name: 'Bench Press', muscle_group: 'Pectoralis', equipment_type: 'Barbell', sets: [
        {weight: 135, reps: 15, warmup: true},
        {weight: 155, reps: 12, warmup: true},
        {weight: 185, reps: 8, warmup: false},
        {weight: 215, reps: 6, warmup: false},
        {weight: 225, reps: 4, warmup: false},
      ]},
      {name: 'Chest Pullovers', muscle_group: 'Pectoralis', equipment_type: 'Dumbbell', sets: [
        {weight: 40, reps: 10, warmup: false},
        {weight: 40, reps: 10, warmup: false},
        {weight: 45, reps: 8, warmup: false},
        {weight: 50, reps: 6, warmup: false},
        {weight: 50, reps: 4, warmup: false},
      ]},
      {name: 'Flyes', muscle_group: 'Pectoralis', equipment_type: 'Cables', sets: [
        {weight: 40, reps: 15, warmup: false},
        {weight: 40, reps: 15, warmup: false},
        {weight: 45, reps: 10, warmup: false},
        {weight: 55, reps: 8, warmup: false},
        {weight: 50, reps: 8, warmup: false},
      ]}
    ],
  };

