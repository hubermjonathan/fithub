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
    ListItem
} from 'react-native';
import Dash from 'react-native-dash';
import { Icon } from 'react-native-elements';
import WorkoutCard from '../components/WorkoutCard';

export default class FeedScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        //dummy workout cards to test look of UI
        workouts: [
            {workout: "Dorito", user: "Brian", icon: "person"},
            {workout: "Big Werk", user: "Andy", icon: "person"},
            {workout: "The Grind", user: "Colin", icon: "person"},
            {workout: "Dorito", user: "Brian", icon: "person"},
            {workout: "Big Werk", user: "Andy", icon: "person"},
            {workout: "The Grind", user: "Colin", icon: "person"},
            {workout: "Dorito", user: "Brian", icon: "person"},
            {workout: "Big Werk", user: "Andy", icon: "person"},
            {workout: "The Grind", user: "Colin", icon: "person"},
        ]
    }


    render() {
        //let workouts = this.getWorkouts(/*put id here, idk how to get it for now */);
        return (
    
          <View style={{flex: 1}}>
            <View>
              <Text style={styles.title}> Global Feed</Text>
              <Dash style={styles.line} />
              <View style={styles.search}>
                <TouchableOpacity>
                  <Icon
                    name="magnifying-glass"
                    type="entypo"
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              // keyExtractor = {(item, index) => index}
              data={this.state.workouts}
              renderItem={({item}) => (
                  <WorkoutCard
                      workout={item.workout}
                      user={item.user}
                  />
                  // <ListItem
                  //   title={item.workout}
                  //   leftIcon={item.icon}
                  //   subtitle={item.user}
                  // />
              )}
                    // <Text> {this.state.workouts[1].workout} </Text>
                    // <Text> {this.state.workouts[2].workout} </Text>
                // data={this.state.workouts}
                // renderItem={({item, index}) => 
                //     <TouchableHighlight>
                //         <ExerciseCard
                //             exercise={item.workout}
                //             equipment={item.equipment}
                //         />
                //     </TouchableHighlight>
                // }
            />
          </View>
        )
      }
}

const styles = StyleSheet.create({
    title: {
      textAlign: 'center',
      fontSize: 20,
      top: 35
    },
    addSpace: {
  
    },
    line: {
      width: 1000,
      height: 1,
      top: 50,
      paddingBottom: 30
  
    },
    search: {
      flexDirection: 'row-reverse',
      right: 15,
      bottom: 30,
  
    },
    group: {
      textAlign: 'center',
      fontSize: 25,
      paddingTop: 15,
      paddingBottom: 15
    },
    large: {
      textAlign: 'center',
      fontSize: 20,
      paddingBottom: 25
    },
})
