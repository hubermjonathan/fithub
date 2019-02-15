import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  Button
} from 'react-native';

export default class Detail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    console.log(navigation.getParam('name', 'Workout'));
    return {
      title: navigation.getParam('name', 'Workout'),
      headerStyle: {
        backgroundColor: "#eee",
        color: "#000"
      }
    };
  };

  render() {
    if(Platform.OS === 'ios') {
      return (
        <SafeAreaView style={styles.container}>
        </SafeAreaView>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>{this.props.navigation.getParam('name', 'workout-name')}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
