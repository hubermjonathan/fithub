import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import { getUserGivenName, getUserFamilyName, getUserPhotoUrl } from '../lib/AccountFunctions';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.loadUserData();
    this.state = {
      name: '',
      photo: ''
    }
  }

  render() {
    if(Platform.OS === 'ios') {
      return (
        <SafeAreaView style={styles.containerIOS}>
          <View style={styles.header}>
            <View style={styles.profPicCol}>
              <Image
                style={styles.profPic} 
                source={{uri: this.state.photo}}
              />
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.name}>{this.state.name}</Text>
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

  async loadUserData() {
    let userGivenName = await getUserGivenName();
    let userFamilyName = await getUserFamilyName();
    let userFullName = userGivenName + ' ' + userFamilyName;
    let userPhotoUrl = await getUserPhotoUrl();

    this.setState({
      name: userFullName,
      photo: userPhotoUrl
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
  header: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fff',
    marginLeft: 20,
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
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  name: {
    color: '#333',
    fontSize: 36,
    fontWeight: 'bold',
  },
});
