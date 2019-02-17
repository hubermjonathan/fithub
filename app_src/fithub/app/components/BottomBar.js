import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import { Icon } from 'react-native-elements';

import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';


export default class BottomBar extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={styles.barContainer}>
        <Icon
          name="book"
          type="material-community"
          size={35}
          // onPress={() => this.props.navigation.navigate('Details')}
        />
        <Icon
          name="plus"
          type="entypo"
          size={35}
          //onPress={() => this.props.navigation.navigate('Details')}
        />
        <Icon
          name="home"
          type="material-community"
          size={35}
          //onPress={() => this.props.navigation.navigate('Details')}
        />
        <Icon
          name="globe"
          type="entypo"
          size={35}
          //onPress={() => this.props.navigation.navigate('Details')}
        />
        <Icon
          name="account"
          type="material-community"
          size={35}
          //onPress={() => this.props.navigation.navigate('Profile')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingTop: 20,
  }
});

/* const RootStack = createStackNavigator(
    {
      Home: App,
      Details: Profile,
    },
    {
      initialRouteName: 'Home',
    }
  );

  const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
} */
