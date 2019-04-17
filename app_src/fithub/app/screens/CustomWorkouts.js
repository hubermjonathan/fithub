import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, Alert, FlatList, RefreshControl } from 'react-native';

import RoutineCard from '../components/RoutineCard';

import { getWorkouts } from '../lib/WorkoutFunctions';
import { getUserID } from '../lib/AccountFunctions';

export default class CustomWorkoutsScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            workouts: [],
        }
    }

    async componentWillMount() {
        await this.fetchWorkouts();
    }

    fetchWorkouts = async () => {
        const id = await getUserID();
        let response = await getWorkouts(id); 
        this.setState({
            workouts: response.workouts,
            refreshing: false,
        })
    }
 
    render() {
        return(
            <View style={styles.page}> 
                <View>
                    <FlatList
                        data={this.state.workouts}
                        refreshControl={    
                            <RefreshControl
                                colors={["#9Bd35A", "#689F38"]}
                                refreshing={this.state.refreshing}
                                onRefresh={this.fetchWorkouts}
                            />
                        }
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