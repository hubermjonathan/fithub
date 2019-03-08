import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { getUserID } from '../lib/AccountFunctions';

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profile',
      headerRight: <Icon name="settings" type="material" size={30} onPress={() => {navigation.push('Settings')}}/>
    }
  };

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
              <View style={styles.nameRow}>
                <Text style={styles.name}>
                  {this.state.name}
                </Text>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statsCol}>
                  <Text style={styles.stats}>Volume:</Text>
                  <Text style={styles.stats}>1000</Text>
                </View>
                <View style={styles.statsCol}>
                  <Text style={styles.stats}>Volume:</Text>
                  <Text style={styles.stats}>1000</Text>
                </View>
                <View style={styles.statsCol}>
                  <Text style={styles.stats}>Volume:</Text>
                  <Text style={styles.stats}>1000</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.body}>
            <Swiper activeDotColor='#00adf5' loop={false}>
              <View style={styles.subContainer}>
                <ScrollView stickyHeaderIndices={[0]}>
                  <View><Text style={styles.subHeader}>Records</Text></View>
                  <View style={styles.record}>
                    <Icon name="error" type="material" size={30} />
                    <Text style={styles.recordText}>
                      Andy hasn't done his part yet
                    </Text>
                  </View>
                  <View style={styles.record}>
                    <Icon name="error" type="material" size={30} />
                    <Text style={styles.recordText}>
                      Still waiting for Andy
                    </Text>
                  </View>
                  <View style={styles.record}>
                    <Icon name="error" type="material" size={30} />
                    <Text style={styles.recordText}>
                      Andy is not done yet
                    </Text>
                  </View>
                  <View style={styles.record}>
                    <Icon name="error" type="material" size={30} />
                    <Text style={styles.recordText}>
                      Maybe one day
                    </Text>
                  </View>
                  <View style={styles.record}>
                    <Icon name="error" type="material" size={30} />
                    <Text style={styles.recordText}>
                      Im going to die waiting
                    </Text>
                  </View>
                </ScrollView>
              </View>
              <View>
                <Text>2</Text>
              </View>
              <View>
                <Text>3</Text>
              </View>
            </Swiper>
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
    let userFullName = "";
    let userPhotoUrl = "";
    let id = await getUserID();

    fetch('https://fithub-server.herokuapp.com/profile/'+id)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      userFullName = data.name;
      userPhotoUrl = data.avatar.substring(0, data.avatar.length-7);

      this.setState({
        name: userFullName,
        photo: userPhotoUrl
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
  header: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#eee',
  },
  profPicCol: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCol: {
    flex: 4,
  },
  nameRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  statsCol: {
    flex: 1,
    alignItems: 'center',
  },
  body: {
    flexDirection: 'row',
    flex: 3,
    backgroundColor: '#fff',
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
  stats: {
    color: '#333',
    fontSize: 20,
  },
  subContainer: {
    flex: 1,
  },
  subHeader: {
    fontSize: 28,
    backgroundColor: '#fff',
    color: '#333',
    fontWeight: 'bold',
    padding: 20,
  },
  record: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  recordText: {
    color: '#333',
    fontSize: 24,
    paddingLeft: 20,
  },
});
