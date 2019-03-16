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

export default class LogCard extends React.Component {
    //LOGCARD RECIEVES EXERCISE AS PROPS
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
 
            modalWeight: undefined,
            modalReps: undefined,
            modalCheckbox: false,
        }
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {
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
                    style={styles.modal}
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
                                Sets
                            </Text>
                        </View>
                        <View style={styles.modalRow}>
                            {/*Weight Input*/}
                            <TextInput
                                style={styles.modalTextInput}
                                onChangeText={(weight) => this.setState({ modalWeight: weight })}
                                //value={this.state.text}
                            />
                            {/*Rep Input*/}
                            <TextInput
                                style={styles.modalTextInput}
                                keyboardType='numeric'
                                onChangeText={(reps) => this.setState({ modalReps: reps })}
                                //value={this.state.text}
                            />
                        </View>

                        {/*Warmup Checkbox Input*/}
                        <CheckBox
                            center
                            title='Warmup?'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={this.state.modalCheckbox}
                            onPress={() => this.setState({ modalCheckbox: !this.state.modalCheckbox })}
                        />

                        <TouchableOpacity 
                        onPress={() => this._modalOKButton() }
                        style={styles.button}
                        >
                            <Text style={styles.buttonText}>
                                OK
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                {/*LogCard rendering*/}
                <View style={styles.card} key={null}>
                    <View style={styles.cardTitle}>
                        <Text style={styles.exerciseLabel}>{this.props.exercise.name}</Text>
                        {this.props.exercise.equipment_type != null &&
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{this.props.exercise.equipment_type}</Text>
                        </View>
                        }
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
                        <TouchableOpacity onPress={() => this.setState({ modalVisible: true }) }>
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
        //console.log("renderSetRow: props: ", this.props);
        //console.log("renderSetRow: set: ", set);
        var swipeoutButtons = [
            {
                text: 'Duplicate',
                backgroundColor: 'green',
                underlayColor: 'rgba(0, 0, 0, 0.6)',
                onPress: () => { this.props.duplicateSet(this.props.index, set.index) }
            },
            {
                text: 'Delete',
                backgroundColor: 'red',
                underlayColor: 'rgba(0, 0, 0, 0.6)',
                //This.props.index == exercise.index
                onPress: () => { this.props.deleteSet(this.props.index, set.index) }
            },
        ];
        //Render a set row, with ability to delete
        return(
            <Swipeout 
                right={swipeoutButtons}
                autoClose={true}
            >
                <View style={styles.setRow}>
                    <Text style={set.isWarmup ? styles.warmupText : styles.exerciseText}>Set {set.index + 1}</Text>
                    <Text style={set.isWarmup ? styles.warmupText : styles.exerciseText}>{set.item.reps} reps</Text>
                    <Text style={set.isWarmup ? styles.warmupText : styles.exerciseText}>{set.item.weight} lbs</Text>
                </View>
            </Swipeout>
        );
    }

    //HANDLER FUNCTIONS
    _modalOKButton() {
        if (this.state.modalReps !== undefined && this.state.modalWeight !== undefined) {
            const set = {"weight": this.state.modalWeight, "reps": this.state.modalReps, "warmup": this.state.modalCheckbox};
            this.props.addSet(this.props.index, set);
        }
        this.setState({
            modalVisible: false,

            modalReps: undefined,
            modalWeight: undefined,
            modalCheckbox: false,
        });
    }   

}

const styles = StyleSheet.create({
    //Modal
    modal: {
        justifyContent: 'center',
        alignContent: 'center',
    },
    modalContent: {

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
        width: '95%',
        minWidth: '95%',
        maxWidth: '95%',
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
        flex: 1,
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
