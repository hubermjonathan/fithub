import React from 'react';
import {
  Platform,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerTintColor: '#00adf5',
  }

  render() {
    if(Platform.OS === 'ios') {
      return (
        <SafeAreaView style={styles.containerIOS}>
          <View style={styles.settingsContainer}>
            <Text style={styles.header}>Settings</Text>
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
  },
  header: {
    fontSize: 36,
    color: '#333',
    fontWeight: 'bold',
  }
});
