import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ExerciseCard extends React.Component {
  constructor(props) {
    super(props);
  }

    render() {
        return(
            <View style={styles.card}>
                <Text style={styles.exerciseLabel}>
                    {this.props.name}
                </Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{this.props.equipment_type}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        width: '98%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 5,
        borderTopWidth: .5,
        borderTopColor: 'black',
    },
    cardTitle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    exerciseLabel: {
        fontWeight: 'bold',
        fontSize: 24,
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
    exerciseText: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#000000',
    },
    equipmentText: {
        fontWeight: 'normal',
        fontSize: 18,
        color: '#404040',
    }
});
