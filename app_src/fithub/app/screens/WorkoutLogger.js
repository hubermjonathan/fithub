import React from 'react';
import { View, SafeAreaView, Text, StyleSheet, Platform, FlatList } from 'react-native';

import LogCard from '../components/LogCard';

export default class WorkoutLoggerScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
        title: navigation.getParam('name', 'Workout'),
        headerTintColor: '#00adf5',
        };
    };

    constructor(props) {
        super(props);
        this.state = {
        name: this.props.navigation.getParam('name', 'Workout'),
        exercises: this.props.navigation.getParam('exercises', []),
        }
    }

    render() {
        if(Platform.OS === 'ios') {
        return (
            <SafeAreaView style={styles.containerIOS}>
                this.buildExercises();
            </SafeAreaView>
        );
        } else {
        return (
            <View style={styles.containerAND}>
                this.buildExercises();
            </View>
        );
        }
    }

    buildExercises() {
        return(
            <View style={styles.page}>
                <FlatList
                    data={this.props.workout.exercises}
                    renderItem={({item, index}) => 
                        <View style={styles.card}>
                            <ExerciseCard 
                                exercise={item.exercise}
                                equipment={item.equipment}
                                sets={item.sets} 
                            />
                        </View>
                    }       
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    containerIOS: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    containerAND: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        paddingTop: 10,
    },
    cardsContainer: {
        flex: 1,
        alignItems: 'center',
    },
});
