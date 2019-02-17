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
            <TouchableOpacity>
            <View style = {styles.border}>
                <Text style={styles.title}>{this.props.group}</Text>
                <Text style={styles.subgroup}>{this.props.subgroup1}</Text>
                <Text style={styles.subgroup}>{this.props.subgroup2}</Text>
                <Text style={this.props.subgroup3 ? styles.addPadding : styles.subgroup}>{this.props.subgroup3}</Text>
            </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 25,
        paddingTop:10
    
    },
    subgroup: {
        textAlign: 'center',
        fontSize: 20,
        padding:5
    },
    bottomBar: {
        flex: 1,
    },
    addPadding: {
        textAlign: 'center',
        fontSize: 20,
        paddingBottom:15
    },
    border: {
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 20,
        padding:5

    }

});
