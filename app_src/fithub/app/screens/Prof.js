import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';

export default class ProfileScreen extends React.Component {
  render() {
    if(Platform.OS === 'ios') {
      return (
        <SafeAreaView style={styles.containerIOS}>
          <View style={styles.header}>
            <View style={styles.profPicCol}>
              <Image
                style={styles.profPic} 
                source={{uri: 'https://lh6.googleusercontent.com/-_G95DQmH1dw/AAAAAAAAAAI/AAAAAAAADnI/enRDZICksZM/photo.jpg'}}
              />
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.name}>Andy Plank</Text>
            </View>
          </View>
          <View style={styles.body}>

          </View>
        </SafeAreaView>
      );
    } else {
      return(
        <View style={styles.containerAND}>
          <Text>PROFILE</Text>
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
  header: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fff',
    marginLeft: 10,
  },
  profPicCol: {
    flex: 2,
    justifyContent: 'center',
  },
  infoCol: {
    flex: 3,
    padding: 30,
  },
  body: {
    flexDirection: 'row',
    flex: 3,
    backgroundColor: '#eee',
  },
  profPic: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    color: '#333',
    fontSize: 36,
    fontWeight: 'bold',
  },
});
