import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//USAGE
//For displaying exercises available to be added to a workout plan
//Contains "exercise, equipment"

//EXAMPLE
// let exercise = "Bench Press";
// let equipment = "Barbell";

//Exercise title: this.props.exercise
//Exercise equipment_type: this.props.equipment

export default class ExerciseCard extends React.Component {
  constructor(props) {
    super(props);
  }

    render() {
        return(
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.exerciseText}>
                        {this.props.exercise}
                    </Text>
                    <Text style={styles.equipmentText}>
                        {this.props.equipment}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 0,
        width: '100%',
        height: 'auto',
        marginTop: 5,
        marginBottom: 5,
        borderTopWidth: .5,
        borderTopColor: 'black',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 3,
        paddingBottom: 3,
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
