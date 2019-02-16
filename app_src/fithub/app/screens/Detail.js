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
            <View style={styles.card}>
              <View style={styles.cardTitle}>
                <Text style={styles.exerciseLabel}>Set</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Warmup</Text>
                </View>
              </View>
            </View>
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
    marginTop: 17,
  },
  card: {
    width: '90%',
    height: '30%',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  cardTitle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
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
