import React from 'react';

import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Platform,
    TouchableHighlight,
    FlatList,
    TouchableOpacity,
    List
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

export default class WorkoutCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            userPhoto: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        }
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.card}>
                    {/* show user at top of card */}
                    <View style={styles.user}>
                        {/* show user profile pic */}
                        {/* <Image
                            source={{ uri: this.state.userPhoto }}
                        /> */}
                        {/* print user of workout */}
                        <TouchableOpacity
                            onPress={() => {
                                //figure how to navigate to profile
                            }}>
                            <Text style={styles.userName}>{this.props.user}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* show workout */}
                    <View style={styles.workoutHeader}>
                        {/* title of workout with plus icon*/}
                        <View style={styles.workoutTitle}>
                            <Text style={styles.workoutTitleText}>{this.props.workout}</Text>
                        </View>
                        <View style={styles.add}>
                            <TouchableOpacity
                                onPress={()=>{
                                    //add to workouts
                                }}>
                                <Icon
                                    name="plus"
                                    type="entypo"
                                    size={30}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* list exercises of workout */}
                    <View style={styles.exerciseList}>
                        <FlatList
                            scrollEnabled={false}
                            data={this.props.exercises}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={(exercise) => this.renderExercises(exercise)}
                        />
                    </View>
                </View>
            </SafeAreaView >
        );
    }

    renderExercises(exercise) {
        //console.log("exercise in renderExercises: ", exercise)
        return (
            <View style={styles.exercise}>
                <Text>{exercise.item.name}</Text>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    card: {
        height: 'auto',
        margin: 10,
        padding: 5,
        backgroundColor: 'lightgrey',
    },
    user: {
        padding: 0,
        margin: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
    },
    userName: {
        //fontSize: 'bold',
        fontSize: 20,
    },
    workout: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    workoutHeader: {
        flex: 1,
        flexDirection: 'row',
        //borderBottomWidth: 1,
    },
    workoutTitle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
    },
    workoutTitleText: {
        fontSize: 30,
        textAlign: 'center',
        color: '#00adf5',
    },
    add: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        //right: 0,
        //bottom: 30,
    },
    exerciseList: {
        paddingBottom: 10,
        paddingTop: 10
    },
    exercise: {
        padding: 2,
        fontSize: 15,
    }
});
