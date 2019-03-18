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
            {workout: "Dorito", user: "Brian", icon: "person",
              exercises: [
                {name: "Bench Press"},
                {name: "Bicep Curls"},
                {name: "Front Squat"},
              ]},
            {workout: "Big Werk", user: "Andy", icon: "person",
                exercises: [
                  {name: "Cardio"},
                  {name: "Lat Pulldown"},
                  {name: "Curls"},
            ]},
            {workout: "The Grind", user: "Colin", icon: "person",
                exercises: [
                  {name: "Bench Press"},
                  {name: "Bicep Curls"},
                  {name: "Front Squat"},
            ]},
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
                    onPress={() => this.props.navigation.navigate('Search')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              keyExtractor = {(item, index) => index.toString()}
              data={this.state.workouts}
              renderItem={({item}) => (
                  <WorkoutCard
                      workout={item.workout}
                      user={item.user}
                      userPhoto={item.icon}
                      exercises={item.exercises}
                  />
              )}
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
