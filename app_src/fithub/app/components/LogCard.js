import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
} from 'react-native';

//EXAMPLE
// let exercise = "Bench Press";
// let equipment = "Barbell";
// let sets = [
//   {isWarmup: true, reps: 15000, weight: 95000, key: '1'},
//   {isWarmup: true, reps: 12, weight: 135, key: '2'},
//   {isWarmup: false, reps: 8, weight: 165, key: '3'},
//   {isWarmup: false, reps: 6, weight: 185, key: '4'},
//   {isWarmup: false, reps: 2, weight: 215, key: '5'},
//   {isWarmup: false, reps: 10, weight: 135, key: '6'}
// ];

    //Exercise title: this.props.exercise
    //Exercise equipment_type: this.props.equipment
    //Exercise sets: this.props.sets
    //Exercise set isWarmup: this.props.sets[i].isWarmup
    //Exercise set #reps: this.props.sets[i].reps
    //Exercise set #lbs: this.props.sets[i].weight

export default class LogCard extends React.Component {
  constructor(props) {
    super(props);

    //Provided props can be modified when within a Card. Therefore, they need to be in state.
    this.state = {
        exercise: this.props.exercise,
        equipment_type: this.props.equipment_type,
        sets: this.props.sets,
    }
  }

  render() {

    console.log(this.props);
    var totalSets;
    var totalReps = 0;
    var totalWeight = 0;

    totalSets = this.props.sets.length;

    for(var i = 0; i < totalSets; i++) {
        totalReps += this.props.sets[i].reps;
        totalWeight == this.props.sets[i].weight;
    }

    return(
        <View style={styles.card} key={null}>
            <View style={styles.cardTitle}>
                <Text style={styles.exerciseLabel}>{this.props.exercise}</Text>
                {this.props.equipment != null &&
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{this.props.equipment}</Text>
                </View>
                }
            </View>
            <View style={styles.cardRowBottom}>
                <Text style={styles.exerciseText}>{totalSets} sets</Text>
                <Text style={styles.exerciseText}>{totalReps} reps</Text>
                <Text style={styles.exerciseText}>{totalWeight} lbs</Text>
            </View>
            <FlatList
                scrollEnabled={false}
                data={this.props.sets}
                renderItem={({item, index}) => 
                    <View style={styles.setRow}>
                        <View style= {{flex: 1, flexDirection: 'row'}}>
                            <Text style={item.isWarmup ? styles.exerciseTextWarmUp : styles.exerciseText}>{item.reps}</Text>
                        </View>
                        <View style= {{flex: 1, alignContent: 'center'}}>
                            <Text> x </Text>
                        </View>
                        <View style= {{flex: 1, alignContent: 'flex-end'}}>
                            <Text style={item.isWarmup ? styles.exerciseTextWarmUp : styles.exerciseText}>{item.weight}</Text>
                        </View>
                    </View>
                }
            /> 
            <View style={styles.cardRowBottom}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={this._addSet}
                >
                    <Text style={styles.buttonText}>Add Set</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={this._editSet}
                >
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this._deleteSet}
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    }

    _addSet() {
        //TODO: Call small dialog box, requesting reps, weight, and isWarmup
        this.setState(previousState  => ({
            sets: [previousState.sets, {isWarmup: null, reps: null, weight: null, key: null}]
        }));
        //TODO: Make changes persist within database (Future)
        //Database functions need to be moved to an independent package for reusability 
    }

    _editSet() {
        //TODO: Call small dialog box, allowing user to modify previously generated set data
        this.setState(previousState => ({
            sets: [previousState.sets, {isWarmup: null, reps: null, weight: null, key: null}]
        }));
        //TODO: Make changes persist within database (Future)
        //Database functions need to be moved to an independent package for reusability 
    }

    _deleteSet() {
        //TODO: Call small dialog box, asking user if they would like to delete a set, or entire workout
        this.setState(previousState => ({
            sets: [previousState.sets, {isWarmup: null, reps: null, weight: null, key: null}]
        }));
        //TODO: Make changes persist within database (Future)
        //Database functions need to be moved to an independent package for reusability 
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 0,
        width: '90%',
        height: 'auto',
        borderTopColor: .5,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
    },
    cardTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 5,
    },
    setRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        borderTopWidth: 0.5,
        marginLeft: 20,
        marginRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    cardRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 2,
        marginBottom: 2,
    },
    cardRowBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 10,
        borderTopWidth: 0.5,
        borderTopColor: '#333',
    },
    exerciseLabel: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    exerciseText: {
        textAlign: 'right',
        fontSize: 24,
        color: '#333',
    },
    exerciseTextWarmUp: {
        fontSize: 24,
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
    cardRowButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    button: {
    },
    buttonText: {
        fontSize: 18,
    },
});
