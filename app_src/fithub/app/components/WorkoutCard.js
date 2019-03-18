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
            <SafeAreaView>
                <View style={styles.card}>
                    {/* show user at top of card */}
                    <View style={styles.user}>
                        {/* show user profile pic */}
                        <Icon
                            name={this.props.icon}
                            style='materialicons'
                        />
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
                        <Text style={styles.workoutTitle}>{this.props.workout}</Text>
                        <TouchableOpacity style={styles.add}
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
        flex: 0,
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
        borderBottomWidth: 1,
    },
    workoutTitle: {
        paddingTop: 10,
        fontSize: 30,
        textAlign: 'center',
    },
    add: {
        flexDirection: 'row-reverse',
        right: 0,
        bottom: 30,
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
