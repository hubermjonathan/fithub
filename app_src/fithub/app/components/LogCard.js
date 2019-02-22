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

export default class LogCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
    console.log(this.props);
    var totalSets;
    var totalReps = 0;
    var totalWeight = 0;

    totalSets = this.props.sets.length;

    for(var i = 0; i < totalSets; i++) {
        totalReps += this.props.sets[i].reps;
        totalWeight += this.props.sets[i].weight;
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
            <FlatList
                scrollEnabled={false}
                data={this.props.sets}
                renderItem={({item, index}) => 
                    <View style={styles.setRow}>
                        <Text style={item.isWarmup ? styles.exerciseTextWarmUp : styles.exerciseText}>Set {index + 1}</Text>
                        <Text style={item.isWarmup ? styles.exerciseTextWarmUp : styles.exerciseText}>{item.reps} reps</Text>
                        <Text style={item.isWarmup ? styles.exerciseTextWarmUp : styles.exerciseText}>{item.weight} lbs</Text>
                    </View>
                }
            /> 
            <View style={styles.cardRowBottom}>
                <Text style={styles.exerciseText}>{totalSets} sets</Text>
                <Text style={styles.exerciseText}>{totalReps} reps</Text>
                <Text style={styles.exerciseText}>{totalWeight} lbs</Text>
            </View>
            <View style={styles.cardButton}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={this.props.addSet()}
                >
                    <Text style={styles.buttonText}>Add Set</Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 0,
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 5,
        marginBottom: 5,
    },
    cardTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    setRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 3,
        paddingBottom: 3,
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
        fontSize: 18,
        color: '#333',
    },
    exerciseTextWarmUp: {
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
    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    cardButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 10,
        borderTopWidth: 0.5,
        borderTopColor: '#333',
    }
});
