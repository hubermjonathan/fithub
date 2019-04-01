import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, Alert, FlatList } from 'react-native';

import RoutineCard from '../components/RoutineCard';

import { DefaultWorkouts } from '../defaults/Workouts';

export default class DefaultWorkoutsScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            workouts: DefaultWorkouts
        }
    }

    render() {
        return(
            <View style={styles.page}> 
                <View>
                    <FlatList
                        data={this.state.workouts} 
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.list}
                        renderItem={(item) => 
                            <View style={styles.card}>
                            <RoutineCard
                                workout={item.item}
                            />
                            </View>
                        }
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        width: '100%',
        backgroundColor: '#f4f4f4',
        alignItems: 'stretch',           
    },
});