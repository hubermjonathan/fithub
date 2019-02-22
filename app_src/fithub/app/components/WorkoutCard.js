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
} from 'react-native';

export default class WorkoutCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <SafeAreaView>
                <View style={{padding:"5%"}}>
                    <View style={styles.border}>
                        <Text style={styles.title}>{this.props.name}</Text>
                        <Text style={styles.title}>{this.props.description}</Text>
                        <Text style={styles.title}>{this.props.sets}</Text>
                        <Text style={styles.title}>{this.props.reps}</Text>
                    </View>
                </View>
            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 25,
        paddingTop: "5%"

    },
    subgroup: {
        textAlign: 'center',
        fontSize: 20,
        padding: "5%"
    },
    bottomBar: {
        flex: 1,
    },
    addPadding: {
        textAlign: 'center',
        fontSize: 20,
        paddingBottom: "5%"
    },
    border: {
        borderColor: 'gray',
        borderWidth: 5,
        borderRadius: 20,
        padding: "5%",
        backgroundColor:'#f7f8f9'
    }

});
