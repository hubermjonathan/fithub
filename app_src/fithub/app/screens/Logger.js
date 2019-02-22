import React from 'react';
import { View, SafeAreaView, Text, TextInput, StyleSheet, Platform, FlatList, Modal, Button } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';

import LogCard from '../components/LogCard';

export default class LoggerScreen extends React.Component {

    static navigationOptions = {
        tabBarIcon: <Icon name="add" type="material" size={35} />
    }

    constructor(props) {
        super(props);
        this.state = {
            uid: Workout.uid,//this.props.navigation.getParam('uid', undefined),
            name: Workout.name,//this.props.navigation.getParam('name', undefined),
            exercises: Workout.exercises,//this.props.navigation.getParam('exercises', []),

            addSetModalIsVisible: false,
            modalReps: undefined,
            modalWeight: undefined,
            modalWarmup: undefined,
        }
    }

    render() {
        console.log(this.props.navigation);
        return(
            <View style={styles.page}>
                {/* <Modal
                    animationType='fade'
                    transparent={false}
                    visible={this.state.addSetModalIsVisible}
                >
                    <View style={styles.modal}>
                        <View style={{flex: 1, flexDirection: 'row', alignContent: 'center'}}>
                            <Text style={styles.modalHeaderText}>New Set:</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignContent:'center'}}>
                            <TextInput  
                                style={styles.modalTextInput}
                                clearButtonMode='while-editing'
                                defaultValue='Reps'
                                selectTextOnFocus={true}
                                keyboardType="number-pad"
                                onChangeText={(text) => this.setState({ modalReps: text })}
                            />
                            <TextInput  
                                style={styles.modalTextInput}
                                clearButtonMode='while-editing'
                                defaultValue='Weight'
                                selectTextOnFocus={true}
                                keyboardType="number-pad"
                                onChangeText={(text) => this.setState({ modalWeight: text })}
                            />
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignContent:'center'}}>
                            <CheckBox
                            center
                            title='Warmup'
                            checked={this.state.modalWarmup}
                            />
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignContent:'center'}}>
                            <Button
                            onPress={this._modalOK}
                            title="OK"
                            color="#841584"
                            />
                        </View>
                    </View>
                </Modal> */}
                <View style={styles.list}>
                    <FlatList
                        data={this.state.exercises}
                        renderItem={({item, index}) => 
                            <View style={styles.card}>
                                <LogCard
                                    exercise={item.name}
                                    equipmentType={item.equipment_type}
                                    muscleGroup={item.muscle_group} 
                                    sets={item.sets}
                                    addSet={() => this._addSet}
                                    editSet={this._editSet}
                                    editExercise={this._editExercise}
                                />
                            </View>
                        }       
                    />
                </View>
            </View>
        );
    }

    _addSet = () => {
        console.log("lmao");
        this.setState({
            addSetModalIsVisible: true
        });
    }

    _modalOK = () => {
        this.setState({
            addSetModalIsVisible: false
        });
        if (this.state.modalReps !== undefined && this.state.modalWeight !== undefined) {
            this.setState(prevState => ({
                exercises: [prevState.exercises, {"weight": modalWeight, "reps": modalReps, "warmup": modalWarmup}]
            }));
        }
        this.setState({
            modalReps: undefined,
            modalWeight: undefined,
        });
    }
}

const styles = StyleSheet.create({
    page: {
        // flex: 1,
        backgroundColor: '#f4f4f4',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // paddingTop: 3,
        // paddingBottom: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    list: {
        flexDirection: 'row',
        justifyContent: 'center',
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

