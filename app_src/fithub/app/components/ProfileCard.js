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
                <View style={[styles.card, styles.shadowProps]}>
                    <Text style={styles.userName}>{this.props.user}</Text>
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
        borderRadius: 15,
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    shadowProps: {
        shadowColor: '#000',
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: .4,
        shadowRadius: 3,
    },
    photo: {
        
    },
    userName: {
        flexDirection: 'row-reverse',
        fontSize: 25,
    }
});