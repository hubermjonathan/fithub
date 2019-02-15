import React from 'react';
import { Icon } from 'react-native-elements';
import { Icon, View } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Profile from '../screens/Profile';

class BottomBar extends React.Component{
export default class BottomBar extends React.Component{
  constructor(props){
    super(props);
  }
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'stretch',
                justifyContent: 'space-around',
                alignItems: 'flex-end',
            }}>
            <Icon
                name="account"
                name="book"
                type="material-community"
                size={20}
                size={50}
                // onPress={() => this.props.navigation.navigate('Details')}
            />
            <Icon
                name="book"
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
}}

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