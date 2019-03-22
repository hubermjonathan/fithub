import React from 'react';
import {
  Platform,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import { getUserID } from '../lib/AccountFunctions';
import { editProfile } from '../lib/ProfileFunctions';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerTintColor: '#00adf5',
  }

  constructor(props) {
    super(props);
    
    this.loadUserData();
    this.state = {
      nameText: '',
      disabled: false,
    }
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
              value={this.state.nameText}
            />
            <Button
              onPress={this.saveChanges.bind(this)}
              title="Save Changes"
              color="#00adf5"
              disabled={this.state.nameText == "" ? true : false}
            />
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

  async saveChanges() {
    let profile = {
      name: this.state.nameText
    };
    await editProfile(profile);
    this.props.navigation.goBack();
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
  },
  header: {
    fontSize: 36,
    color: '#333',
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  subHeader: {
    fontSize: 28,
    color: '#333',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  input: {
    fontSize: 24,
    color: '#999',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  }
});
