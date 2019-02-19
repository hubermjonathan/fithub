import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  Button
} from 'react-native';
import BottomBar from '../components/BottomBar';

export default class DetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name', 'Workout'),
      headerTintColor: '#00adf5',
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      name: this.props.navigation.getParam('name', 'Workout'),
      exercises: this.props.navigation.getParam('exercises', []),
    }
  }

  render() {
    if(Platform.OS === 'ios') {
      return (
        <SafeAreaView style={styles.containerIOS}>
          <View style={styles.cardsContainer}>
            <Cards exercises={this.state.exercises} />
            
          </View>
          <BottomBar navigation={this.props.navigation}/>
        </SafeAreaView>
      );
    } else {
      return (
        <View style={styles.containerAND}>
          <BottomBar navigation={this.props.navigation}/>
        </View>
      );
    }
  }
}

class Cards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let cards = [];

    for(let i = 0; i < this.props.exercises.length; i++) {
      cards.push(
        <View style={styles.card} key={"card-"+i}>
          <View style={styles.cardTitle}>
            <Text style={styles.exerciseLabel}>{this.props.exercises[i].name}</Text>
            {this.props.exercises[i].isWarmup &&
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Warmup</Text>
              </View>
            }
          </View>

          <Sets reps={this.props.exercises[i].reps} weight={this.props.exercises[i].weight} />
        </View>
      );
    }

    return cards;
  }
}

class Sets extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let sets = [];
    
    let totalReps = 0;
    let totalWeight = 0;
    for(let i = 0; i < this.props.reps.length; i++) {
      totalReps += this.props.reps[i];
      totalWeight += this.props.weight[i];
    }

    for(let i = 0; i < this.props.reps.length; i++) {
      if(i === this.props.reps.length-1) {
        sets.push(
          <View key={"set-"+i} style={styles.cardRowBottom}>
            <Text style={styles.exerciseText}>{i} sets</Text>
            <Text style={styles.exerciseText}>{totalReps} reps</Text>
            <Text style={styles.exerciseText}>{totalWeight} lbs</Text>
          </View>
        );
      } else {
        sets.push(
          <View key={"set-"+i} style={styles.cardRow}>
            <Text style={styles.exerciseText}>Set {i+1}</Text>
            <Text style={styles.exerciseText}>{this.props.reps[i]} reps</Text>
            <Text style={styles.exerciseText}>{this.props.weight[i]} lbs</Text>
          </View>
        );
      }
    }

    return sets;
  }
}

const styles = StyleSheet.create({
  containerIOS: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  containerAND: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: 10,
  },
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: '30%',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginTop: 17,
  },
  cardTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 17,
  },
  cardRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
  },
  cardRowBottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#333',
  },
  exerciseLabel: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  exerciseText: {
    fontSize: 18,
    color: '#333',
  },
  badge: {
    width: '35%',
    height: 30,
    backgroundColor: '#00adf5',
    borderRadius: 5,
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 18,
    paddingTop: 6,
  },
});
