import React from 'react';
import {
  Platform,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  ActionSheetIOS,
  Dimensions,
} from 'react-native';
import { getUserID } from '../lib/AccountFunctions';
import { editProfile, getSelectedStats, editStats } from '../lib/ProfileFunctions';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerTintColor: '#00adf5',
  }

  constructor(props) {
    super(props);
        
    this.state = {
      nameText: '',
      stat1: '',
      stat2: '',
      masterOptions: [
        'Total Volume',
        "Max Bench Press",
        'Bench Press Volume',
        'Max Squat',
        'Squat Volume',
        "Max Deadlift",
        'Deadlift Volume',
        "Max Tricep Extensions",
        'Tricep Extensions Volume',
        "Max Cable Rows",
        'Cable Rows Volume',
        "Max Curls",
        'Curls Volume',
        'Cancel'
      ],
      currentOptions: [],
    }

    this.loadUserData();
    this.loadOptions();
  }

  async saveChanges() {
    let profile = {
      name: this.state.nameText
    };
    let stats = {
      stat1: this.state.stat1,
      stat2: this.state.stat2,
    }
    await editProfile(profile);
    await editStats(stats);
    this.props.navigation.goBack();
  }

  async loadOptions() {
    let id = await getUserID();
    let selected_stats = await getSelectedStats(id);

    let updatedOptions = this.state.masterOptions.slice();
    updatedOptions.splice(updatedOptions.indexOf(selected_stats.selected_stat1), 1);
    updatedOptions.splice(updatedOptions.indexOf(selected_stats.selected_stat2), 1);

    this.setState({
      stat1: selected_stats.selected_stat1,
      stat2: selected_stats.selected_stat2,
      currentOptions: updatedOptions,
    });
  }

  async loadUserData() {
    let userFullName = "";
    let id = await getUserID();

    fetch('https://fithub-server.herokuapp.com/profile/'+id)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      userFullName = data.name;

      this.setState({
        nameText: userFullName,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  showStat1Picker() {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: this.state.currentOptions,
        title: 'Statistic 1',
        message: 'Choose a statistic to show in the first slot',
        cancelButtonIndex: 11,
        tintColor: '#00adf5'
      },
      index => {
        if(index === 11) return;
        let updatedOptions = this.state.masterOptions.slice();
        updatedOptions.splice(updatedOptions.indexOf(this.state.stat2), 1);
        updatedOptions.splice(updatedOptions.indexOf(this.state.currentOptions[index]), 1);

        this.setState({
          stat1: this.state.currentOptions[index],
          currentOptions: updatedOptions,
        });
      }
    );
  }

  showStat2Picker() {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: this.state.currentOptions,
        title: 'Statistic 2',
        message: 'Choose a statistic to show in the second slot',
        cancelButtonIndex: 11,
        tintColor: '#00adf5'
      },
      index => {
        if(index === 11) return;
        let updatedOptions = this.state.masterOptions.slice();
        updatedOptions.splice(updatedOptions.indexOf(this.state.stat1), 1);
        updatedOptions.splice(updatedOptions.indexOf(this.state.currentOptions[index]), 1);

        this.setState({
          stat2: this.state.currentOptions[index],
          currentOptions: updatedOptions,
        });
      }
    );
  }

  render() {
    if(Platform.OS === 'ios') {
      return (
        <SafeAreaView style={styles.containerIOS}>
          <View style={styles.settingsContainer}>
            <Text style={styles.header}>Settings</Text>
            
            <Text style={styles.subHeader}>Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({nameText: text})}
              placeholder={this.state.nameText}
            />

            <Text style={styles.subHeader}>Statistic 1</Text>
            <View style={styles.statContainer}>
              <Text style={styles.statText}>{this.state.stat1}</Text>
              <TouchableOpacity
                style={styles.statChange}
                onPress={this.showStat1Picker.bind(this)}
              >
                <Text style={styles.statChangeText}>Change</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.subHeader}>Statistic 2</Text>
            <View style={styles.statContainer}>
              <Text style={styles.statText}>{this.state.stat2}</Text>
              <TouchableOpacity
                style={styles.statChange}
                onPress={this.showStat2Picker.bind(this)}
              >
                <Text style={styles.statChangeText}>Change</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.submitButtonContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={this.saveChanges.bind(this)}
                disabled={this.state.nameText == "" ? true : false}
              >
                <Text style={styles.submitButtonText}>Save Changes</Text>
              </TouchableOpacity>
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
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
  },
  containerAND: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  settingsContainer: {
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 36,
    color: '#333',
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 28,
    color: '#333',
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 10,
  },
  input: {
    fontSize: 24,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statChange: {
    padding: 10,
    backgroundColor: '#00adf5',
    borderRadius: 5,
    width: 80,
  },
  statChangeText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  statText: {
    fontSize: 24,
  },
  submitButtonContainer: {
    position: 'absolute',
    bottom: 10,
    height: 60,
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  submitButton: {
    height: '100%',
    width: '95%',
    borderRadius: 5,
    backgroundColor: '#00adf5',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
