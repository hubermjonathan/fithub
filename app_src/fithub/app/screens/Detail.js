import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  Button
} from 'react-native';

export default class Detail extends React.Component {
    render() {
      if(Platform.OS === 'ios') {
        return (
          <SafeAreaView style={styles.container}>
            <Text>{this.props.navigation.getParam('name', 'workout-name')}</Text>
            <Button onPress={() => this.props.navigation.goBack()} title="Go Back"/>
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
