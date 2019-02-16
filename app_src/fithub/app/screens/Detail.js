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

  render() {
    if(Platform.OS === 'ios') {
      return (
        <SafeAreaView style={styles.containerIOS}>
          <Text style={styles.text}>
            {this.props.navigation.getParam('name', 'Workout')}
          </Text>
        </SafeAreaView>
      );
    } else {
      return (
        <View style={styles.containerAND}>
          <View style={styles.calendar}>
            <Calendar navigation={this.props.navigation} />
          </View>
          <View style={styles.bottomBar}>
            <BottomBar />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  containerIOS: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerAND: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  text: {
    fontSize: 50,
  }
});
