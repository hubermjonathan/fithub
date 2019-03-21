import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  StatusBar,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  FlatList,
  ListItem,
  Image,
} from 'react-native';

export default class ProfileCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            userPhoto: '',
        }
    }

    render() {
        return (
            <SafeAreaView>
                <View style={styles.card}>
                    <TouchableOpacity
                        onPress={() => {
                            //figure how to navigate to profile
                        }}>
                        {/* show user profile pic */}
                        {/* <Image
                            style={styles.photo}
                            source={{ uri: this.state.userPhoto }}
                        />                         */}
                        <Text style={styles.userName}>{this.props.user}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        height: 'auto',
        margin: 10,
        padding: 5,
        backgroundColor: 'lightgrey',
        flexDirection: 'column',
    },
    photo: {
        
    },
    userName: {
        flexDirection: 'row-reverse',
        fontSize: 25,
    }
});