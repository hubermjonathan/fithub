import React from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    StatusBar,
    Platform
} from 'react-native';
import BottomBar from '../components/BottomBar';

class ProfileScreen extends React.Component {
    constructor(props){
        super(props);
      }

    render() {
        return (
            <View>
                <Text>Profile Screen</Text>
                <BottomBar navigation={this.props.navigation}/>
            </View>
        )
    }
}

export default ProfileScreen;
