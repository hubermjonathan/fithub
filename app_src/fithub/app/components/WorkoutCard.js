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
                <View style={{paddingLeft:"5%",paddingRight:"5%",paddingBottom:"5%"}}>
                    <View style={styles.border}>
                        <Text style={styles.title}>Name: "{this.props.name}"</Text>
                        <Text style={styles.title}> Exercises </Text>
                        {this.props.sets.map((val,index)=>{
                            return(
                                <Text
                                    key={index}
                                    style={styles.title}> "{val.name}"/{val.reps.length}-sets/{val.reps[0]}-reps/{val.weight[0]}lb
                                </Text>
                            );
                        })}
                       
                      
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
    border: {
        borderColor: 'gray',
        borderWidth: 5,
        borderRadius: 20,
        padding: "5%",
        backgroundColor:'#f7f8f9'
    }

});
