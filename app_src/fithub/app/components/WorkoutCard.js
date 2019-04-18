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
import { getGains, addGains, addComment, following, unfollowUser } from '../lib/SocialFunctions';
import { getUserID, getUserName, getUserGivenName } from '../lib/AccountFunctions';


export default class WorkoutCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currUser: '',
            id: '',
            name: '',
            photo: '',
            user: '',
            comment: '',
            likedByUser: this.props.likedByUser,
            comments: this.props.comments,
            gains: this.props.gains,
            following: [],
        }
    }

    async componentDidMount() {
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

        //code to tell if current user has liked the workout
        const id = await getUserID();
        this.setState({id: id});
        if(this.props.liked_users.indexOf(id) != -1){
            this.setState({likedByUser: true});
        }
        else{
            this.setState({likedByUser: false});
        }

        const currUser = await getUserGivenName();
        this.setState({currUser: currUser});
        
        const usersFollowing = await following(id);
        console.log(usersFollowing);
    }

    async submitComment(comment) {
        //TODO
        //add server calls to add comment to comment list
        if (!comment){
            return;
        }
        itemtoSend = {
            comment: comment,
            workoutId: this.props.workoutID, //yeah because this isn't confusing
        };
        addComment(itemtoSend);
        
        //need to update state to update render
        const user = await getUserID();
        commentForState = {
            user: user,
            username: this.state.currUser,
            text: comment,
        }
        this.setState({comment: ''});
        this.state.comments.push(commentForState);
    }

    changeLike() {
        if (this.state.likedByUser){
            this.setState({likedByUser: false});
            this.setState({gains: this.state.gains - 1});
        }
        else {
            this.setState({likedByUser: true});
            this.setState({gains: this.state.gains + 1});
        }
        workout={workout: this.props.workoutID};
        addGains(workout);
    }

    follow() {
        userToFollow={followid: this.props.user}
        if(this.state.usersFollowing.indexOf(this.state.id) == -1){
            followUser(userToFollow);
        }
        else{
            unfollowUser(userToFollow);
        }

    }


    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={[styles.card, styles.shadowProps]}>
                    {/* show user at top of card */}
                    <View style={styles.user}>
                        {/* print user of workout */}
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.push('Profile', {id: this.props.user})}
                            style={styles.userName}
                        >
                            <Text style={styles.userName}>{this.state.user}</Text>
                        </TouchableOpacity>
                        {/* follower button */}
                        <TouchableOpacity
                            onPress={() => this.follow()}
                            disabled={this.props.following}
                        >
                            <View style={styles.follow}>
                                <Text style={styles.followText}>Follow</Text>
                            </View>
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
                            listKey={(item2, index) => 'E' + index.toString()}
                            renderItem={(exercise) => this.renderExercises(exercise)}
                        />
                    </View>

                    {/* comments of workout */}
                    <View style={styles.commentsList}>
                        <FlatList
                            scrollEnabled={false}
                            data={this.state.comments}
                            listKey={(item2, index) => 'C' + index.toString()}
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
                                    this.submitComment(this.state.comment)
                                }}
                            />
                        </View>
                        <View style={styles.like}>
                            <Text style={styles.likeText}>{this.state.gains} gains</Text>
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
        return (
            <View style={styles.exercise}>
                <Text>{exercise.item.name}</Text>
            </View>
        );
    }

    renderComments(comment) {
        return (
            <View style={styles.comment}>
                <Text style={{fontWeight: 'bold'}}>{comment.item.username}{": "}</Text>
                <Text>{comment.item.text}</Text>
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
        borderRadius: 15,
        backgroundColor: 'white',
    },
    shadowProps: {
        shadowColor: '#000',
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: .4,
        shadowRadius: 3,
    },
    user: {
        padding: 3,
        margin: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
    },
    userName: {
        //fontSize: 'bold',
        flex: 5,
        fontSize: 25,
    },
    follow: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#00adf5',
        borderRadius: 15,
        padding: 5,
    },
    followText: {
        textAlign: 'center',
        color: '#00adf5',
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
        alignItems: 'center',
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
        flexDirection: 'row',
        justifyContent: 'flex-start',
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
