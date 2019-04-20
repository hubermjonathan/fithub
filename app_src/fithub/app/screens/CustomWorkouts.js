import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, Alert, FlatList, RefreshControl, Modal, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-datepicker';

import RoutineCard from '../components/RoutineCard';

import { postLog } from '../lib/LogFunctions';
import { getWorkouts } from '../lib/WorkoutFunctions';
import { getUserID } from '../lib/AccountFunctions';

export default class CustomWorkoutsScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            workouts: [],
            modal: {
                workout: undefined,
                visible: false,
                date: undefined,
            }
        }
    }

    async componentWillMount() {
        await this.fetchWorkouts();
    }

    fetchWorkouts = async () => {
        const id = await getUserID();
        let response = await getWorkouts(id); 
        let workouts = response.workouts;

        workouts.sort((a, b) => {return a.name > b.name});

        this.setState({
            workouts: workouts,
            refreshing: false,
        })
    }
 
    render() {
        return(
            <View style={styles.page}> 
                {/* Modal for Scheduling */}
                <Modal
                    style={styles.modal}
                    visible={this.state.modal.visible}
                    animationType="fade"
                    presentationStyle="pageSheet"
                > 
                    <View style={styles.modal}>
                        <View style= {{ height: 200 }}>
                        </View>
                        <View style={styles.headingContainer}>
                            <Text style={styles.heading}>
                                Schedule A Workout
                            </Text>
                        </View>
                        <View style={styles.datePickerContainer}>
                            <DatePicker
                                style={{width: '100%'}}
                                date={this.state.modal.date}
                                mode="date"
                                placeholder="Please Select Date"
                                format="YYYY-MM-DD"
                                minDate="2015-01-01"
                                maxDate="2025-12-31"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                onDateChange={(date) => { 
                                    this.setState(prevState => (
                                        { ...prevState, modal: { ...prevState.modal, date: date } })
                                    )
                                }}
                            />
                        </View>
                        <View style={styles.row}>
                            <View style={styles.buttonView}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() =>                                  
                                        this.setState(prevState => (
                                        { ...prevState, modal: {visible: false}}
                                        ))
                                    }
                                >
                                    <Text style={styles.buttonText}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.buttonView}>
                                <TouchableOpacity 
                                    style={styles.button}
                                    disabled={this.state.modal.date == undefined ? true : false}                                  
                                    onPress={() => {
                                        this.setState(prevState => (
                                            { ...prevState, modal: {visible: false}})
                                        );
                                        const workout = {...this.state.modal.workout, date: this.state.modal.date }
                                        postLog(workout); 
                                    }}
                                >
                                    <Text style={styles.buttonText}>
                                        Schedule
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style= {{ height: 100 }}>
                        </View>
                    </View>
                </Modal>
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
                                <TouchableOpacity
                                    onPress={() => { 
                                        this.setState(prevState => (
                                            { ...prevState, modal: { ...prevState.modal, workout: item.item, visible: true } })
                                        )
                                    }}
                                >
                                    <RoutineCard
                                        workout={item.item}
                                    />
                                </TouchableOpacity>
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
        flex: 1,
        backgroundColor: '#f4f4f4',  
        alignItems: 'stretch',
        borderRadius: 5.0
    },

    modal: {
        flex: 1,
        justifyContent: 'center',
    },

    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }, 

    headingContainer: {
        paddingBottom: 30, 
    },

    heading: {
        textAlign: 'center',
        fontSize: 40,
        color: '#333',
    },

    datePickerContainer: {
        justifyContent: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 5,
        paddingRight: 5,
    },

    datePicker: {

    },

    buttonView: {
        paddingTop: 15,
        paddingBottom: 15,
        height: 80,
        width: '45%',
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    button: {
        height: '100%',
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#00adf5',
        justifyContent: 'center',
    },
    // list: {
    //     flex: 1,
    // }

});