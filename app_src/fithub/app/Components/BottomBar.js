import React from 'react';
import { Icon, View } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Profile from '../screens/Profile';

export default class BottomBar extends React.Component{
  constructor(props){
    super(props);
  }
    render() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'flex-end',
            }}>
            <Icon
                name="book"
                type="material-community"
                size={50}
                // onPress={() => this.props.navigation.navigate('Details')}
            />
            <Icon
              name="plus"
              type="entypo"
              size={50}
              //onPress={() => this.props.navigation.navigate('Details')}
            />
            <Icon
              name="home"
              type="material-community"
              size={50}
              //onPress={() => this.props.navigation.navigate('Details')}
            />
            <Icon
              name="globe"
              type="entypo"
              size={50}
              //onPress={() => this.props.navigation.navigate('Details')}
            />
            <Icon
                name="account"
                type="material-community"
                size={50}
                //onPress={() => this.props.navigation.navigate('Profile')}
            />
            </View>
        );
    }
}

module.export = BottomBar;

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