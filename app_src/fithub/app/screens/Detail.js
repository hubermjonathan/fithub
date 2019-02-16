import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  Button
} from 'react-native';

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
        </SafeAreaView>
      );
    } else {
      return (
        <View style={styles.containerAND}>
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

          <View style={styles.cardRow}>
            <Text style={styles.exerciseText}>Set 1</Text>
            <Text style={styles.exerciseText}>4 reps</Text>
            <Text style={styles.exerciseText}>5 lbs</Text>
          </View>
          
          <View style={styles.cardRow}>
            <Text style={styles.exerciseText}>Set 2</Text>
            <Text style={styles.exerciseText}>3 reps</Text>
            <Text style={styles.exerciseText}>10 lbs</Text>
          </View>

          <View style={styles.cardRow}>
            <Text style={styles.exerciseText}>Set 3</Text>
            <Text style={styles.exerciseText}>4 reps</Text>
            <Text style={styles.exerciseText}>15 lbs</Text>
          </View>

          <View style={styles.cardRowBottom}>
            <Text style={styles.exerciseText}>3 sets</Text>
            <Text style={styles.exerciseText}>11 reps</Text>
            <Text style={styles.exerciseText}>110 lbs</Text>
          </View>
        </View>
      );
    }

    return cards;
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
