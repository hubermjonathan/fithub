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
    List,
    Alert,
    Button,
    TextInput
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { postWorkout } from '../lib/WorkoutFunctions';


export default class WorkoutCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            comment: '',
            likedByUser: this.props.likedByUser,
        }
    }

    componentDidMount() {
        fetch('https://fithub-server.herokuapp.com/profile/' + this.props.user)
            .then((res) => {
                return res.json();
            })
            .then((data) => {

                this.setState({
                    user: data.name,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    submitComment() {
        //TODO
        //add server calls to add comment to comment list

        console.log(this.state.comment);
    }

    changeLike() {
        //TODO
        if (this.state.likedByUser){
            this.setState({likedByUser: false})
        }
        else {
            this.setState({likedByUser: true})
        }
    }


    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.card}>
                    {/* show user at top of card */}
                    <View style={styles.user}>
                        {/* print user of workout */}
                        <TouchableOpacity onPress={() => this.props.navigation.push('Profile', {id: this.props.user})}>
                            <Text style={styles.userName}>{this.state.user}</Text>
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
                                    console.log(this.props.fullWorkout);
                                    postWorkout(this.props.fullWorkout);
                                    Alert.alert("Workout added");
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

                    {/* comments of workout */}
                    <View style={styles.commentsList}>
                        <FlatList
                            listKey="comments"
                            scrollEnabled={false}
                            data={this.props.comments}
                            listKey={(item, index) => 'D' + index.toString()}
                            renderItem={(comment) => this.renderComments(comment)}
                        />
                    </View>

                    {/* commentBox and like button */}
                    <View style={styles.likeComment}>
                        <View style={styles.commentBox}>
                            <TextInput
                                style={styles.commentBox}
                                placeholder="Add a comment..."
                                onChangeText={(text) => this.setState({comment: text})}
                                onSubmitEditing={() => {
                                    this.submitComment()
                                }}
                            />
                        </View>
                        <View style={styles.like}>
                            <Text style={styles.likeText}>{this.props.likes} likes</Text>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.changeLike();
                                }}
                            >
                                <Icon
                                    name={this.state.likedByUser? 'heart': 'heart-outlined'}
                                    type="entypo"
                                    size={25}
                                    color={this.state.likedByUser? '#00adf5': 'black'}
                                />
                            </TouchableOpacity>
                        </View>
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

    renderComments(comment) {
        return (
            <View style={styles.comment}>
                <Text>{comment}</Text>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    card: {
        flex: 1,
        height: 'auto',
        margin: 10,
        padding: 5,
        backgroundColor: 'white',
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
        fontSize: 25,
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
        flex: 10,
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
        paddingTop: 10,
        borderBottomWidth: .5,
    },
    exercise: {
        padding: 2,
        fontSize: 18,
    },
    commentsList: {

    },
    comment: {
        fontSize: 12,
    },
    likeComment: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    commentBox: {
        padding: 4,
        fontSize: 20,
    },  
    like: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeText: {
        padding: 4,
        fontSize: 20,
    }
});
