import React from 'react';

import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Platform,
    TouchableHighlight,
    FlatList,
    TouchableOpacity,
    List
} from 'react-native';
import { ListItem } from 'react-native-elements';

export default class WorkoutCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView>
                <View style={{ padding: '5%' }}>
                    <View style={styles.border}>
                        <Text style={styles.title}>{this.props.name}</Text>
                        {this.props.exercises.map((val, index) => {
                            return (
                                <View key={index}>
                                    <Text
                                        style={styles.exerciseText}>{val.name}
                                    </Text>
                                </View>
                            )
                        })
                        }
                    </View>
                </View>
            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 30,
        paddingBottom: '5%'

    },
    border: {
        borderColor: 'gray',
        borderWidth: 5,
        borderRadius: 25,
        padding: "5%",
        backgroundColor: '#f7f8f8'
    },
    exerciseText: {
        fontSize: 25,
        textAlign: 'center',
        paddingBottom: '3%'
    }

});
