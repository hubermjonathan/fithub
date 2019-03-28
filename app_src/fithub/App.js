import React from 'react';
import { Alert } from 'react-native';
import { Asset, AppLoading } from 'expo';

import { Provider } from 'react-redux';
import ReduxStore from './app/config/ReduxStore';

import AppContainer from './app/components/AppContainer';
import { verifyAuthToken, logInToGoogle } from './app/lib/AccountFunctions';
import SignInScreen from './app/screens/SignIn';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        LoggedIn: undefined,
    };
}
   
  async _verifyUser() {
    try {
      const status = await verifyAuthToken();
      if (status === undefined) {
        //Consider throwing error, or prompt restart
      }

      this.setState({
        LoggedIn: status
      });
    } catch(e) {
      console.log(e);
    }
  };

  async _handleSignIn() {
    try {
      const result = await logInToGoogle();
      if (result === true) {
        this.setState({
          LoggedIn: result
        })
      } else {
          console.log("logInToGoogle() returned false. Unable to log in user")
          Alert.alert(
            'Sign in Error',
            'Google Authentication failed to verify your information.',
            [
                {text: "OK", onPress: () => {}}
            ],
          );
      }
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    if (this.state.LoggedIn === undefined) {
      return (
        <AppLoading
          startAsync={() => this._verifyUser()}
          onFinish={() => this.setState({})}
          onError={console.warn}
        />
      );
    } else if (this.state.LoggedIn === false) {
      return (
        <SignInScreen signIn={() => this._handleSignIn()}/>
      );
    } 
    //this.state.LoggedIn === true) 
    return (
      <Provider store={ReduxStore}>
        <AppContainer />
      </Provider>
    );
  }
}
