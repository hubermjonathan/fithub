import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    AlertIOS,
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

        this.state = {
            calories: 0,
        };
    }

    enterCalories() {
        AlertIOS.prompt(
            'Add Calories',
            'How many calories do you want to log?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                },
                {
                    text: 'Add',
                    onPress: (calories) => {
                        this.logCalories(calories);
                    }
                },
            ],
            'plain-text',
            '',
            'numeric'
        );
    }

    logCalories(calories) {
        this.setState({
            calories: this.state.calories += Math.round(+calories),
        });
    }

    render() {
        return(
            <SafeAreaView style={styles.containerIOS}>
                <View style={styles.loggingContainer}>
                    <View style={styles.numberContainer}>
                        <Text style={styles.trackingNumber}>{this.state.calories}</Text>                    
                        <Text style={styles.trackingText}>calories today</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.trackingButton}
                            onPress={this.enterCalories.bind(this)}
                        >
                            <Text style={styles.buttonText}>Log Calories</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.graphsContainer}>
                    <View style={styles.graphCard}>
                        <Text style={styles.graphLabel}>This Week</Text>
                    </View>
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
        padding: 15,
        height: '90%',
        width: '90%',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    graphLabel: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});