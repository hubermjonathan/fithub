import React from 'react';

import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
} from 'react-native';

import Calendar from '../components/Calendar';
import BottomBar from '../components/BottomBar';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      header: null,
    }
  
    render() {
      if(Platform.OS === 'ios') {
        return (
          <SafeAreaView style={styles.containerIOS}>
            <View style={styles.calendar}>
              <Calendar navigation={this.props.navigation} />
            </View>
            <View style={styles.bottomBar}>
              <BottomBar />
            </View>
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
    calendar: {
      flex: 11,
    },
    bottomBar: {
      flex: 1,
    },
  });