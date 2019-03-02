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
import { ListItem } from 'react-native-elements';

export default class WorkoutCard extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <SafeAreaView>
                <View style={{ paddingLeft: "5%", paddingRight: "5%", paddingBottom: "5%" }}>
                    <View style={styles.border}>
                        <List>
                            <FlatList
                                data={this.props.exercises}
                                renderItem={({ item }) => (
                                    <ListItem 
                                        title={item.name} 
                                    />
                                )}
                            />
                       </List>
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
        backgroundColor: '#f7f8f9'
    }

});
