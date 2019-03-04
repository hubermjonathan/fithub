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
                <View style={styles.card}>
                    <View style={styles.row}>
                        {/* print workout title */}
                        <Text style={styles.title}>{this.props.workout}</Text>
                        {/* print user of workout */}
                        <Text style={styles.user}>{this.props.user}</Text>
                    </View>
                    {/* {this.props.exercises.map((val, index) => {
                        return (
                            <View key={index}>
                                <Text
                                    style={styles.exerciseText}>{val.name}
                                </Text>
                            </View>
                        )
                    })
                    } */}
                </View>
            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 0,
        width: '100%',
        height: 'auto',
        margin: 10,
        padding: 15,
        borderWidth: 1.5,
        borderColor: 'black',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 3
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#000000',
    },
    user: {
        fontWeight: 'normal',
        fontSize: 18,
        color: '#404040',
    }

});
