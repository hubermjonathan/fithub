import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

export default class NutritionScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: 'Nutrition',
          headerTintColor: '#00adf5',
        };
    };

    constructor(props) {
        super(props);
    }

    logCalories() {
        console.log("log");
    }

    render() {
        return(
            <SafeAreaView style={styles.containerIOS} >
                <View style={styles.loggingContainer}>
                    <View style={styles.numberContainer}>
                        <Text style={styles.trackingNumber}>1250</Text>
                        <Text style={styles.trackingText}>calories today</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.trackingButton}
                            onPress={this.logCalories.bind(this)}
                        >
                            <Text style={styles.buttonText}>Log Calories</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.graphsContainer}>
                    <View style={styles.graphCard}></View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    containerIOS: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#fff',
    },
    loggingContainer: {
        flex: 1,
        alignItems: 'center',
    },
    graphsContainer: {
        flex: 1,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    numberContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    trackingNumber: {
        fontSize: 96,
        fontWeight: 'bold',
    },
    trackingText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    trackingButton: {
        height: '50%',
        width: '50%',
        borderRadius: 5,
        backgroundColor: '#00adf5',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    graphCard: {
        height: '90%',
        width: '90%',
        borderRadius: 5,
        backgroundColor: '#fff',
    }
});