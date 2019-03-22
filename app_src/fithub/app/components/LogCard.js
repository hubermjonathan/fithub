import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Modal,
  TextInput,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';

import { CheckBox } from 'react-native-elements'

import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';

export default class LogCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            modalMode: undefined,
            modalSetIndex: undefined,
 
            modalWeight: undefined, 
            modalReps: undefined,
            modalCheckbox: false,
        }
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {
        //console.log("LogCard props: ", this.props);
        var totalSets;
        var totalReps = 0;
        var totalWeight = 0;
        totalSets = this.props.exercise.sets.length;

        for(var i = 0; i < totalSets; i++) {
            totalReps += parseInt(this.props.exercise.sets[i].reps);
            totalWeight += parseInt(this.props.exercise.sets[i].weight);
        }
        return(
            <View>
                {/*Modal for creating new set*/}
                <Modal
                    //style={styles.modal}
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    presentationStyle='formSheet'
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalRow}>
                            {/*Weight Input*/}
                            <Text style={styles.modalText}>
                                Reps
                            </Text>
                            <Text style={styles.modalText}>
                                Weight
                            </Text>
                        </View>
                        <View style={styles.modalRow}>
                            {/*Rep Input*/}
                            <TextInput
                                style={styles.modalTextInput}
                                keyboardType='numeric'
                                onChangeText={(reps) => this.setState({ modalReps: reps })}
                                //value={this.state.text}
                            />
                            {/*Weight Input*/}
                            <TextInput
                                style={styles.modalTextInput}
                                keyboardType='numeric'
                                initialValue="12345"
                                onChangeText={(weight) => this.setState({ modalWeight: weight })}
                                //value={this.state.text}
                            />
                        </View>

                        {/*Warmup Checkbox Input*/}
                        <CheckBox
                                center
                                title='Warmup?'
                                checkedIcon='check-square-o'
                                uncheckedIcon='square-o'
                                checkedColor='#00adf5'
                                checked={this.state.modalCheckbox}
                                onPress={() => this.setState({ modalCheckbox: !this.state.modalCheckbox })}
                        />

                        <View style={styles.buttonView}>
                            <TouchableOpacity onPress={() => this._modalOKButton() }>
                                <Text style={styles.buttonText}>
                                    Add Set
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/*LogCard rendering*/}
                <View style={styles.card} key={null}>

                    <View>
                        <Swipeout
                        style={{backgroundColor: '#fff'}}
                            right={
                            [
                                {
                                text: 'Delete',
                                backgroundColor: 'red',
                                underlayColor: 'rgba(0, 0, 0, 0.6)',
                                onPress: () => { this.props.dispatch({type: "DeleteExercise", payload: this.props.index}) }
                                },
                            ]
                            } 
                            autoClose={true}
                        >
                            <View style={styles.cardTitle}>
                                <Text style={styles.exerciseLabel}>{this.props.exercise.name}</Text>
                                {this.props.exercise.equipment_type != null &&
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{this.props.exercise.equipment_type}</Text>
                                </View>
                                }
                            </View>
                        </Swipeout>
                    </View>
                    
                    <View style={styles.setsList}>
                        <FlatList
                            scrollEnabled={false}
                            data={this.props.exercise.sets}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={(set) =>  this.renderSetRow(set)}
                        /> 
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.exerciseText}>{totalSets} sets</Text>
                        <Text style={styles.exerciseText}>{totalReps} reps</Text>
                        <Text style={styles.exerciseText}>{totalWeight} lbs</Text>
                    </View> 
                    
                    <View style={styles.buttonView}>
                        <TouchableOpacity onPress={() => 
                            this.setState({ 
                                modalMode: "add",
                                modalVisible: true 
                            })}
                        >
                            <Text style={styles.buttonText}>
                                Add Set
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    renderSetRow(set) {
        //Define Delete button for swiping right on a set to delete.
        var swipeoutButtons = [
            {
                text: 'Edit',
                backgroundColor: 'blue',
                underlayColor: 'rgba(0, 0, 0, 0.6)',
                onPress: () =>
                    this.setState({
                        modalMode: "edit",
                        modalSetIndex: set.index,
                        modalVisible: true 
                    })
            },
            {
                text: 'Duplicate',
                backgroundColor: 'green',
                underlayColor: 'rgba(0, 0, 0, 0.6)',
                //onPress: () => { this.props.duplicateSet(this.props.index, set.index) }
                onPress: () => { this.props.dispatch({type: "DuplicateSet", payload: {exerciseIndex: this.props.index, setIndex: set.index }}) }
            },
            {
                text: 'Delete',
                backgroundColor: 'red',
                underlayColor: 'rgba(0, 0, 0, 0.6)',
                //This.props.index == exercise.index
                //onPress: () => { this.props.deleteSet(this.props.index, set.index) }
                onPress: () => { this.props.dispatch({type: "DeleteSet", payload: {exerciseIndex: this.props.index, setIndex: set.index}}) }
                //this.props.dispatch({type: "DuplicateSet", payload: {set, setIndex: this.state.modalSetIndex, exerciseIndex: this.props.index}});
            },
        ];
        //Render a set row, with ability to delete
        return(
            <Swipeout 
                right={swipeoutButtons}
                autoClose={true}
            >
                <View style={styles.setRow}>
                    <Text style={set.item.warmup ? styles.warmupText : styles.exerciseText}>Set {set.index + 1}</Text>
                    <Text style={set.item.warmup ? styles.warmupText : styles.exerciseText}>{set.item.reps} reps</Text>
                    <Text style={set.item.warmup ? styles.warmupText : styles.exerciseText}>{set.item.weight} lbs</Text>
                </View>
            </Swipeout>
        );
    }

    //HANDLER FUNCTIONS
    _modalOKButton() {
        //console.log("LOG CARD: ", this.props);
        if (this.state.modalReps !== undefined && this.state.modalWeight !== undefined) {
            const set = {"weight": this.state.modalWeight, "reps": this.state.modalReps, "warmup": this.state.modalCheckbox};
            if (this.state.modalMode === "add") {
                this.props.dispatch({type: "AddSet", payload: {set, exerciseIndex: this.props.index}});
                //this.props.addSet(this.props.index, set);
            } else if (this.state.modalMode === "edit") {
                this.props.dispatch({type: "EditSet", payload: {set, setIndex: this.state.modalSetIndex, exerciseIndex: this.props.index}});
                //this.props.editSet(this.props.index, this.state.modalSetIndex, set);
            }
        }
 
        this.setState({
            modalVisible: false,
            modalMode: undefined,
            modalSetIndex: undefined,

            modalReps: undefined,
            modalWeight: undefined,
            modalCheckbox: false,
        });
    }   
    // swipeoutExerciseButtons = [
    //     {
    //         text: 'Delete',
    //         backgroundColor: 'red',
    //         underlayColor: 'rgba(0, 0, 0, 0.6)',
    //         //This.props.index == exercise.index
    //         onPress: () => { this.props.deleteExercise(this.props.index) } 
    //     },
    // ];
}


const styles = StyleSheet.create({
    //Modal
    modal: {
        justifyContent: 'center',
        alignContent: 'center',
    },
    modalContent: {
        justifyContent: 'center',
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
    },
    modalRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    modalText: {
        fontSize: 30,
    },
    modalTextInput: {
        height: 50,
        width: '49%', 
        borderColor: 'gray', 
        borderWidth: 1,
    },
    
    
    //LogCard
    card: {
        flex: 1,
        width: '100%',
        alignContent: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginTop: 17,
    },
    cardTitle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    setRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingTop: 5,
        paddingBottom: 2,
        paddingLeft: 10,
        paddingRight: 10,
    },
    setsList: {
        backgroundColor: '#fff',
    },
    summaryRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderTopWidth: 0.5,
        borderTopColor: '#333',
    },
    exerciseLabel: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    exerciseText: { 
        fontSize: 18,
        color: '#333',
    },
    warmupText: {
        fontSize: 18,
        color: '#00adf5',
      },
    badge: {
        width: '35%',
        height: 30,
        backgroundColor: '#00adf5',
        borderRadius: 5,
        alignItems: 'center',
    },
    badgeText: {
        color: '#fff',
        fontSize: 18,
        paddingTop: 6,
    },
    buttonView: {
        flex: 0,
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dedad6',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderTopColor: '#333',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#00adf5'
    }
});
