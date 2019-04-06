import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Image,
  TouchableWithoutFeedbackBase,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { getProfileStats, getProfileActivity, getSelectedStats } from '../lib/ProfileFunctions';
import { getUserID } from '../lib/AccountFunctions';
import { ContributionGraph, LineChart } from 'react-native-chart-kit';

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 3 // optional, default 3
}
//delete this later
const garbageWeightData = {
  labels: ['03-04', '03-05', '03-10', '04-04', '04-09', '04-21'],
  datasets: [{
    data: [140, 140, 142, 147, 146, 144],
    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
    strokeWidth: 2 // optional
  }]
}
//delete this later
const garbageVolumeData = {
  labels: ['03-04', '03-05', '03-10', '04-04', '04-09', '04-21'],
  datasets: [{
    data: [820, 1320, 990, 1204, 1193, 1002],
    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
    strokeWidth: 2 // optional
  }]
}
const screenWidth = Dimensions.get('window').width

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    if (navigation.getParam('id', '') === '') {
      return {
        title: 'Profile',
        headerRight: <Icon name="settings" type="material" containerStyle={{ paddingRight: 10 }} size={30} onPress={() => { navigation.push('Settings') }} />
      }
    } else {
      return {
        title: 'Profile',
        headerLeft: (
          <TouchableOpacity
            onPress={() => { navigation.push('Feed') }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Icon name="chevron-left" type="material" size={30} />
              <Text style={{ fontSize: 18 }}>Feed</Text>
            </View>
          </TouchableOpacity>
        )
      }
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      idLoaded: false,
      id: '',
      name: '',
      photo: '',
      activityInfo: [],
      dates: [],
      stat1: {
        name: "Stat 1",
        data: 0,
      },
      stat2: {
        name: "Stat 2",
        data: 0,
      },
      weightStats: {
        data: garbageWeightData.datasets[0].data,
        min: 0,
        max: 0,
        average: 0
      },
      volumeStats:{
        data:garbageVolumeData.datasets[0].data,
        min:0,
        max:0,
        average:0
      }
    }

    const didFocusListener = this.props.navigation.addListener('didFocus', this.loader.bind(this));
  }

  loader() {
    if (this.state.idLoaded) {
      this.loadUserData();
      this.loadUserStats();
      this.loadWorkoutActivity();
      this.loadWorkoutDates();
      this.setState({weightStats:this.calcWeightStats(this.state.weightStats)});
      this.setState({volumeStats:this.calcWeightStats(this.state.volumeStats)});
    }
  }

  calcWeightStats(obj) {
    let min = obj.data[0];
    let max = obj.data[0];
    let average = obj.data[0];


    for (let x = 1; x < obj.data.length; x++) {
      if (obj.data[x] < min) {
        min = obj.data[x];
      }
      if (obj.data[x] > max) {
        max = obj.data[x];
      }
      average += obj.data[x];
    }
    average = average / obj.data.length;

    console.log("length", obj.data.length)

    let newobj = { data: obj.data, min: min, max: max, average: average.toFixed(1) };

    return newobj;
  }

  async loadUserStats() {
    let stats = await getProfileStats(this.state.id);
    let selected_stats = await getSelectedStats(this.state.id);

    let stat1 = {
      name: selected_stats.selected_stat1,
      data: 0
    }

    let stat2 = {
      name: selected_stats.selected_stat2,
      data: 0
    }

    if (stat1.name.includes("Total")) {
      let totalVolume = 0;
      for (let key in stats.volumes) {
        totalVolume += stats.volumes[key];
      }
      stat1.data = totalVolume;
    } else if (stat1.name.includes("Max")) {
      stat1.data = stats.maxes[stat1.name.slice(4)];
    } else if (stat1.name.includes("Volume")) {
      stat1.data = stats.volumes[stat1.name.slice(0, stat1.name.search("Volume") - 1)];
    }

    if (stat2.name.includes("Total")) {
      let totalVolume = 0;
      for (let key in stats.volumes) {
        totalVolume += stats.volumes[key];
      }
      stat2.data = totalVolume;
    } else if (stat2.name.includes("Max")) {
      stat2.data = stats.maxes[stat2.name.slice(4)];
    } else if (stat2.name.includes("Volume")) {
      stat2.data = stats.volumes[stat2.name.slice(0, stat2.name.search("Volume") - 1)];
    }

    this.setState({
      stat1: stat1,
      stat2, stat2
    });
  }

  async loadUserData() {
    let userFullName = "";
    let userPhotoUrl = "";

    fetch('https://fithub-server.herokuapp.com/profile/' + this.state.id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        userFullName = data.name;
        userPhotoUrl = data.avatar.substring(0, data.avatar.length - 7);

        this.setState({
          name: userFullName,
          photo: userPhotoUrl
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async loadWorkoutActivity() {
    fetch('https://fithub-server.herokuapp.com/logs/' + this.state.id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let info = [];
        data.logs.map((val, index) => {
          info.push({ name: val.name, date: val.date.slice(0, 10) });
        });
        this.setState({ activityInfo: info });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async loadWorkoutDates() {
    let rdates = [];
    fetch(`https://fithub-server.herokuapp.com/profile/${this.state.id}/dates`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        for (let i in data.dates) {
          rdates.push({ date: i, count: data.dates[i] });
        }
        //console.log(rdates)
        this.setState({ dates: rdates });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async loadWeightData() {
    fetch('route-for-weightdata')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //get the data and set state here
      })
      .catch((err) => {
        console.log(err);
      })
  }

  componentDidMount() {
    getUserID().then(id => {
      this.setState({
        idLoaded: true,
        id: this.props.navigation.getParam('id', id)
      });
      this.loader();
    });
  }

  renderPagination(index, total, context) {
    return (
      <View style={styles.paginationContainer}>
        <View style={index == 0 ? styles.paginationTextContainerActive : styles.paginationTextContainer}><Text style={index == 0 ? styles.paginationTextActive : styles.paginationText}>Activity</Text></View>
        <View style={index == 1 ? styles.paginationTextContainerActive : styles.paginationTextContainer}><Text style={index == 1 ? styles.paginationTextActive : styles.paginationText}>History</Text></View>
        <View style={index == 2 ? styles.paginationTextContainerActive : styles.paginationTextContainer}><Text style={index == 2 ? styles.paginationTextActive : styles.paginationText}>Graphs</Text></View>
      </View>
    );
  }

  render() {
    if (Platform.OS === 'ios' && this.state.idLoaded) {
      return (
        <SafeAreaView style={styles.containerIOS}>

          <View style={styles.header}>
            <View style={styles.infoContainer}>
              <View style={styles.nameRow}>
                <Text style={styles.nameText}>
                  {this.state.name}
                </Text>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statContainer}>
                  <Text style={styles.statText}>{this.state.stat1.name}:</Text>
                  <Text style={styles.statText}>{this.state.stat1.data}</Text>
                </View>
                <View style={styles.statContainer}>
                  <Text style={styles.statText}>{this.state.stat2.name}:</Text>
                  <Text style={styles.statText}>{this.state.stat2.data}</Text>
                </View>
              </View>
            </View>

            <View style={styles.picContainer}>
              {this.state.photo !== '' && <Image style={styles.profPic} source={{ uri: this.state.photo }} />}
            </View>
          </View>

          <View style={styles.body}>
            <Swiper activeDotColor='#00adf5' loop={false} renderPagination={this.renderPagination.bind(this)}>
              <View style={styles.subContainer}>
                <ScrollView>
                  <View style={styles.subScroller}>
                    <Activity id={this.state.id} />
                  </View>
                </ScrollView>
              </View>
              <View style={styles.subContainer}>
                <ScrollView>
                  <ContributionGraph
                    style={{ borderBottomWidth: 1, color: 'red' }}
                    values={this.state.dates}
                    endDate={new Date('2019-06-01')}
                    numDays={104}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                  />
                </ScrollView>
              </View>
              <View style={styles.subContainer}>
                <ScrollView>
                  <View style={{ paddingTop: '3%' }}>
                    <View style = {styles.graphTitle}>
                      <Text style={styles.graphText}>Bodyweight History</Text>
                    </View>
                    <LineChart
                      data={garbageWeightData}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                    <View style={styles.graphStats}>
                      <Text style={{ paddingLeft: '1%', fontSize: 18, color: 'white' }}>
                        Min: {this.state.weightStats.min} lbs
                      </Text>
                      <Text style={{ fontSize: 18, color: 'white' }}>
                        Max: {this.state.weightStats.max} lbs
                      </Text>
                      <Text style={{ paddingRight: '1%', fontSize: 18, color: 'white' }}>
                        Average: {this.state.weightStats.average} lbs
                      </Text>
                    </View>
                  </View>

                  <View style={{ paddingTop: '3%' }}>
                    <View style = {styles.graphTitle}>
                      <Text style={styles.graphText}>Volume History</Text>
                    </View>
                    <LineChart
                      data={garbageVolumeData}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                    <View style={styles.graphStats}>
                      <Text style={{ paddingLeft: '1%', fontSize: 18, color: 'white' }}>
                        Min: {this.state.volumeStats.min} lbs
                      </Text>
                      <Text style={{ fontSize: 18, color: 'white' }}>
                        Max: {this.state.volumeStats.max} lbs
                      </Text>
                      <Text style={{ paddingRight: '1%', fontSize: 18, color: 'white' }}>
                        Average: {this.state.volumeStats.average} lbs
                      </Text>
                    </View>
                  </View>

                </ScrollView>
              </View>
            </Swiper>
          </View>

        </SafeAreaView>
      );
    } else {
      return (
        <View style={styles.containerAND}>
          <Text>PROFILE</Text>
        </View>
      );
    }
  }
}

class Activity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      algoData: [],
      shadowProps: {
        shadowColor: '#000',
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: .4,
        shadowRadius: 3,
      }
    }

    this.loadActivities();
  }

  render() {
    let activities = [];

    for (let i = 0; i < this.state.algoData.length; i++) {
      activities.push(
        <View style={[styles.record, this.state.shadowProps]} key={i}>
          <Icon name={this.state.algoData[i].icon} type="material" size={30} />
          <Text style={styles.recordText}>
            {this.state.algoData[i].text}
          </Text>
        </View>
      );
    }

    return activities;
  }

  async loadActivities() {
    let activities = await getProfileActivity(this.state.id);
    activities = activities.activity;
    let parsedActivities = [];

    for (let i = 0; i < activities.length; i++) {
      if(activities[i] === null) continue;

      let icon = "";
      if (activities[i].includes("new max of")) {
        icon = "star";
      } else if (activities[i].includes("worked out on")) {
        icon = "today";
      } else {
        icon = "error";
      }

      parsedActivities[i] = { text: activities[i], icon: icon }
    }

    this.setState({
      algoData: parsedActivities
    });
  }
}

class ActivityCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activityInfo: []

    }
  }
  render() {
    let aCards = []
    for (let x = 0; x < this.props.data.length; x++) {
      aCards.push(
        <TouchableOpacity
          key={x}
          onPress={() => {/*do something here later*/ }}
        >
          <View style={styles.record}>
            <Icon name="flash-outline" type="material-community" size={30} />
            <Text style={styles.recordText}>
              {this.props.data[x].name} - {this.props.data[x].date}
            </Text>
          </View>
        </TouchableOpacity>
      )
    }


    return aCards;
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
    paddingTop: 10,
  },
  infoContainer: {
    flex: 2,
    paddingLeft: 20,
    justifyContent: 'space-evenly',
  },
  nameRow: {
    flexDirection: 'row',
  },
  statsRow: {
    flexDirection: 'row',
  },
  statContainer: {
    marginRight: 40,
    width: 95,
  },
  picContainer: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flexDirection: 'row',
    flex: 4,
    backgroundColor: '#fff',
  },
  profPic: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  nameText: {
    color: '#333',
    fontSize: 36,
    fontWeight: 'bold',
  },
  statText: {
    color: '#333',
    fontSize: 18,
  },
  paginationContainer: {
    position: 'absolute',
    flexDirection: 'row',
    flex: 1,
    height: 55,
    width: Dimensions.get('window').width,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  paginationTextContainer: {
    height: 55,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  paginationTextContainerActive: {
    height: 55,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 2,
    borderColor: '#00adf5',
  },
  paginationText: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paginationTextActive: {
    color: '#00adf5',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subContainer: {
    paddingTop: 55,
    flex: 1,
    backgroundColor: '#eee',
  },
  subScroller: {
    alignItems: 'center',
    marginBottom: 15,
  },
  subHeaderContainer: {
    borderBottomWidth: 1,
  },
  subHeader: {
    fontSize: 28,
    backgroundColor: '#fff',
    color: '#00adf5',
    fontWeight: 'bold',
    padding: 20,
  },
  record: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 100,
    width: '95%',
    borderRadius: 15,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 30,
    marginTop: 15,
  },
  recordText: {
    color: '#333',
    fontSize: 24,
    paddingLeft: 20,
  },
  card: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginTop: 17,
  },
  graphStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '100%',
    backgroundColor: '#00adf5',
    borderRadius: 5,
  },
  graphTitle: {
    backgroundColor: 'white',
  },
  graphText:{
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline'
  }


});
