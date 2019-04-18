import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  StatusBar,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  FlatList,
  ListItem,
  Modal,
} from 'react-native';
import Dash from 'react-native-dash';
import { Icon, Button } from 'react-native-elements';
import WorkoutCard from '../components/WorkoutCard';
import { getPublicWorkouts } from '../lib/WorkoutFunctions';

export default class FeedScreen extends React.Component {
  

    constructor(props) {
        super(props);
    }

    state = {
        modalVisible: false,
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }



    render() {
        return (
            <SafeAreaView style={{ flex: 1}}>
                <View>
                    <Icon 
                        style={{ right: 10 }} 
                        name="filter" type="MaterialDesignIcons" 
                        size={30} 
                        onPress={() => {this.setModalVisible(true)}}
                    />
                </View>
                {/* feed after the header */}
                <View style={styles.feed}>
                    <FlatList
                        listKey={(item, index) => index.toString()}
                        data={this.props.workouts}
                        renderItem={({ item }) => (
                            <WorkoutCard
                                fullWorkout={{
                                    id: "",
                                    uid: "",
                                    token: "",
                                    public: false,
                                    description: item.description,
                                    name: item.name,
                                    exercises: item.exercises,
                                    date: item.date
                                }}
                                workout={item.workout}
                                workoutID={item.workoutID}
                                user={item.user}
                                userPhoto={item.icon}
                                exercises={item.exercises}
                                comments={item.comments}
                                gains={item.gains}
                                liked_users={item.liked_users}
                                navigation={this.props.navigation}
                            />
                        )}
                    />
                    
                    <Modal
                        animationType="fade"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}
                        style={{ flex: 1 }}
                    >

                        <SafeAreaView style={{ flex: 1 }}>
                            <View style={{ flex: 10 }}>
                                <FlatList
                                    keyExtractor={(item, index) => index.toString()}
                                    data={this.props.muscleGroups}
                                    renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => this.props.selectedFilter(item.enum)}>
                                        <Text style={{ fontSize: 30 }}>
                                        {item.muscle}
                                        </Text>
                                    </TouchableOpacity>
                                    )}
                                />
                            </View>
                            <View style={{ flex: 1, paddingTop: 10 }}>
                                <Button
                                    style={{ allignItems: 'flex-end' }}
                                    buttonStyle={{ backgroundColor: '#e04a21' }}
                                    title="Cancel"
                                    onPress={() => {
                                    this.setModalVisible(false);
                                    }}
                                />
                            </View>
                        </SafeAreaView>

                    </Modal>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 45,
    padding: 10,
  },
  title: {
    fontSize: 25,
    left: 5,
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: 15,
    //bottom: 30,
  },
  feed: {
    backgroundColor: '#eee',
  },
})
