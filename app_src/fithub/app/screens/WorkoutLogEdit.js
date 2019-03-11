import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  Alert,
  TouchableOpacity
} from 'react-native';
import BottomBar from '../components/BottomBar';
import { Icon, Button } from 'react-native-elements';
import { postLog } from '../lib/LogFunctions';
import Dialog from 'react-native-dialog';
import DatePicker from 'react-native-datepicker'
export default class WorkoutLogEditScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Log/Edit Workout",
      headerTintColor: '#00adf5',
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      name: this.props.navigation.getParam('name', 'Workout'),
      exercises: this.props.navigation.getParam('exercises', []),
      selectedRep: 0,
      date: '01-01-2019'

    }


  }

  getCurrentDate() {
    let date = new Date();
    return date.toJSON().slice(0, 10);
  }

  render() {
    if (Platform.OS === 'ios') {
      return (
        <SafeAreaView style={styles.containerIOS}>
          <ScrollView style={styles.cardsContainer}>
            <Cards exercises={this.state.exercises} />
            <View style = {{alignItems:'center'}}>
              <DatePicker
                style={{ paddingTop: '3%' }}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2019-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(date) => { this.setState({ date: date }) }}
              />
            </View>
            <Button
              style={{ paddingTop: '3%' }}
              title={'Log this workout'}
              onPress={() => {
                /*
                postLog({
                  id: "",
                  uid: "",
                  token: "",
                  date: this.state.date,
                  name: this.state.name,
                  exercises: this.state.exercises,
                })*/
                //postlog is broken for now. will crash the server
              }}
            />
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return (
        <View style={styles.containerAND}>
          <ScrollView style={styles.cardsContainer}>
            <SummaryCard exercises={this.state.exercises} />
            <Cards exercises={this.state.exercises} />

          </ScrollView>
        </View>
      );
    }
  }
}

class SummaryCard extends React.Component {
  render() {
    let totalSets = 0;
    let totalReps = 0;
    let totalVolume = 0;

    for (let i = 0; i < this.props.exercises.length; i++) {
      totalSets += this.props.exercises[i].sets.length;
      for (let j = 0; j < this.props.exercises[i].sets.length; j++) {
        totalReps += this.props.exercises[i].sets[j].reps;
        totalVolume += this.props.exercises[i].sets[j].weight;
      }
    }

    return (
      <View style={styles.card} key={"summary-card"}>
        <Text style={styles.summaryText}>Sets: {totalSets}</Text>
        <Text style={styles.summaryText}>Reps: {totalReps}</Text>
        <Text style={styles.summaryText}>Volume: {totalVolume} lbs</Text>
      </View>
    );
  }
}

class Cards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let cards = [];

    for (let i = 0; i < this.props.exercises.length; i++) {
      cards.push(
        <View style={styles.card} key={"card-" + i}>
          <View style={styles.cardTitle}>
            <Text style={styles.exerciseLabel}>{this.props.exercises[i].name}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{this.props.exercises[i].muscle_group}</Text>
            </View>
          </View>

          <Sets sets={this.props.exercises[i].sets} />
        </View>
      );
    }

    return cards;
  }
}

class Sets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editReps: false,
      selectedRep: 0,
      tempRep: 0,

      tempWeight: 1,
      editWeight: false,
      selectedWeight: 0
    }
  }

  render() {
    let sets = [];

    let totalSets = this.props.sets.length;
    let totalReps = 0;
    let totalWeight = 0;
    for (let i = 0; i < this.props.sets.length; i++) {
      totalReps += this.props.sets[i].reps;
      totalWeight += this.props.sets[i].weight;
    }

    for (let i = 0; i < this.props.sets.length; i++) {
      if (this.props.sets[i].isWarmup) {
        sets.push(
          <View key={"set-" + i} style={styles.cardRow}>
            <Text style={styles.warmupText}>Set {i + 1}</Text>
            <Text style={styles.warmupText}>{this.props.reps[i]} reps</Text>
            <Text style={styles.warmupText}>{this.props.weight[i]} lbs</Text>
          </View>
        );
      } else {
        sets.push(
          <View key={"set-" + i} style={styles.cardRow}>
            {/* Edit reps dialog*/}
            <Dialog.Container visible={this.state.editReps}>
              <Dialog.Title>Edit Rep Count</Dialog.Title>
              <Dialog.Input
                keyboardType="number-pad"
                onChangeText={(text) => {
                  this.setState({ tempRep: parseInt(text) });
                }}
              />
              <Dialog.Button label='Cancel' onPress={() => {
                this.setState({ editReps: false })
              }} />
              <Dialog.Button label='Confirm' onPress={() => {
                this.setState({ editReps: false });
                this.props.sets[this.state.selectedRep].reps = this.state.tempRep;
              }} />
            </Dialog.Container>

            {/* Edit Weight dialog*/}
            <Dialog.Container visible={this.state.editWeight}>
              <Dialog.Title>Edit Weight</Dialog.Title>
              <Dialog.Input
                keyboardType="number-pad"
                onChangeText={(text) => {
                  this.setState({ tempWeight: parseInt(text) });
                }} />
              <Dialog.Button label='Cancel' onPress={() => {
                this.setState({ editWeight: false })
              }} />
              <Dialog.Button label='Confirm' onPress={() => {
                this.setState({ editWeight: false });
                this.props.sets[this.state.selectedWeight].weight = this.state.tempWeight;
              }} />
            </Dialog.Container>

            <Text style={styles.exerciseText}>Set {i + 1}</Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({ editReps: true });
                this.setState({ selectedRep: i });
              }}
            >
              <Text style={styles.exerciseText}>{this.props.sets[i].reps} reps</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ editWeight: true });
                this.setState({ selectedWeight: i });
              }}>
              <Text style={styles.exerciseText}>{this.props.sets[i].weight} lbs</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }

    sets.push(
      <View key={"summary-row"} style={styles.cardRowBottom}>
        <Text style={styles.exerciseText}>{totalSets} sets</Text>
        <Text style={styles.exerciseText}>{totalReps} reps</Text>
        <Text style={styles.exerciseText}>{totalWeight} lbs</Text>
      </View>
    );

    return sets;
  }
}

const styles = StyleSheet.create({
  containerIOS: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
  },
  containerAND: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    paddingTop: 10,
  },
  cardsContainer: {
    flex: 1,
    width: '90%',
  },
  card: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginTop: 17,
  },
  cardTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 7,
    marginLeft: 10,
    marginRight: 10,
  },
  cardRowBottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 7,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
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
  warmupText: {
    fontSize: 18,
    color: '#00adf5',
  },
  summaryText: {
    fontSize: 32,
    fontWeight: 'bold',
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
