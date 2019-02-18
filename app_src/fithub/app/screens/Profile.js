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
            <View style={styles.container}>
                <View style={styles.text}> 
                    <Text>Profile Screen</Text>
                </View>
                <View style={styles.bottomBar}>
                    <BottomBar navigation={this.props.navigation}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomBar: {
      flex: 1,
    },
  });

export default ProfileScreen;
