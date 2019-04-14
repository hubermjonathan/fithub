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
import { getUserID } from '../lib/AccountFunctions';
import { getCalories, editCalories, getWeight, editWeight } from '../lib/NutritionFunctions';
import { ContributionGraph, LineChart } from 'react-native-chart-kit';

const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 3, // optional, default 3
}

const screenWidth = Dimensions.get('window').width

// let calorieData = {
//     labels: ["1"],
//     datasets: [{
//         data: [1],
//         color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
//         strokeWidth: 3 // optional

//     }]
// }

function calcStats(obj) {
        let min = obj.data[0];
        let max = obj.data[0];
        let average = parseInt(obj.data[0]);


        for (let x = 1; x < obj.data.length; x++) {
            if (obj.data[x] < min) {
                min = obj.data[x];
            }
            if (obj.data[x] > max) {
                max = obj.data[x];
            }
            average += parseInt(obj.data[x]);

        }
        average = average / obj.data.length;

        let newobj = { data: obj.data, min: min, max: max, average: average.toFixed(1) };

        return newobj;
    }

export class CalorieScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            calories: 0,
            calorieStats: {
                data: [],
                min: 0,
                max: 0,
                average: 0
            },
            calorieData:{
                labels: [],
                datasets: [{
                    data: [],
                    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
                    strokeWidth: 3 // optional
            
                }]
            }
        };
    }

    componentDidMount() {
        getUserID().then(id => {
            this.setState({
                loaded: true,
                id: id
            });
            this.loader();
        });
    
    }

    async loadCalorieData() {
        fetch(`https://fithub-server.herokuapp.com/logs/${this.state.id}/calories`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
               //console.log(data);
                if (this.state.calorieData.labels.length > 0) {
                    this.state.calorieData.labels = [];
                    this.state.calorieData.datasets[0].data = [];
                }
                if(data.length < 7){
                    for (let x = 0; x < data.length; x++) {
                        this.state.calorieData.labels.push(data[x].date.slice(5));
                        this.state.calorieData.datasets[0].data.push(data[x].calories);
                    }
                }
                else{
                    for (let x = data.length-6; x < data.length; x++) {
                        this.state.calorieData.labels.push(data[x].date.slice(5));
                        this.state.calorieData.datasets[0].data.push(data[x].calories);
                    }
                }
                this.setState({ calorieStats: calcStats(this.state.calorieData.datasets[0]) });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    loader() {
        if (this.state.loaded) {
            getCalories(this.state.id).then(calories => {
                let date = new Date();
                let offsetInHours = date.getTimezoneOffset() / 60;
                date.setHours(date.getHours() - offsetInHours);
                let dateString = date.toJSON().slice(0, 10);

                if (calories[calories.length - 1].date === dateString) {
                    this.setState({
                        calories: calories[calories.length - 1].calories,
                    });
                } else {
                    this.setState({
                        calories: 0,
                    });
                }
            }); 
            this.loadCalorieData();
        }
        

    }

    enterCalories() {
        AlertIOS.prompt(
            'Log Calories',
            'How many calories do you want to log?',
            [
                {
                    text: 'Cancel',
                    onPress: () => { },
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

    async logCalories(calories) {
        if(+calories === 0) return;
        if(+this.state.calories === 10000) return;

        let date = new Date();
        let offsetInHours = date.getTimezoneOffset() / 60;
        date.setHours(date.getHours() - offsetInHours);
        let dateString = date.toJSON().slice(0, 10);

        let newCalories = {
            date: dateString,
            calories: +this.state.calories + +calories > 10000 ? 10000 : Math.round(+this.state.calories + +calories)
        }

        editCalories(newCalories).then(() => {
            setTimeout(() => {
                this.loader();
            }, 300);
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.containerIOS}>
                <View style={styles.loggingContainer}>
                    <View style={styles.numberContainer}>
                        <Text style={styles.trackingNumber}>{this.state.loaded ? this.state.calories : 0}</Text>
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
                        <Text style={styles.graphText}>History</Text>
                        <View>{
                            this.state.calorieData.labels.length > 0?
                            <LineChart
                                data={this.state.calorieData}
                                width={screenWidth * .80}
                                height={190}
                                chartConfig={chartConfig}    
                            /> :
                            <Text> Loading... </Text>
                        }
                              
                        </View>
                    </View>
                    {
                    this.state.calorieStats.data.length > 0?
                    <View style={styles.graphStats}>
                        <Text style={{ paddingLeft: '1%', fontSize: 18, color: 'white' }}>
                            Min: {this.state.calorieStats.min}
                                </Text>
                        <Text style={{ fontSize: 18, color: 'white' }}>
                            Max: {this.state.calorieStats.max}
                                </Text>
                        <Text style={{ paddingRight: '1%', fontSize: 18, color: 'white' }}>
                            Average: {this.state.calorieStats.average}
                                </Text>
                    </View>:
                    <Text>Loading...</Text>
                    }
                </View>
            </SafeAreaView>
        );
    }
}

export class WeightScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            weight: 0,
            weightStats: {
                data: [],
                min: 0,
                max: 0,
                average: 0
            },
            weightData:{
                labels:[],
                datasets:[{
                    data:[],
                    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
                    strokeWidth: 3 // optional
                }]
            }
        };
    }

    componentDidMount() {
        getUserID().then(id => {
            this.setState({
                loaded: true,
                id: id
            });
            this.loader();
        });
        

    }

    loader() {
        if (this.state.loaded) {
            getWeight(this.state.id).then(weight => {
                this.setState({
                    weight: weight[weight.length - 1].weight,
                });
            });
            this.loadWeightData();
        }
       
    }

    async loadWeightData() {
        fetch(`https://fithub-server.herokuapp.com/logs/${this.state.id}/weight`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (this.state.weightData.labels.length > 0) {
                    this.state.weightData.labels = [];
                    this.state.weightData.datasets[0].data = [];
                }
                if(data.length < 7){
                    for (let x = 0; x < data.length; x++) {
                        this.state.weightData.labels.push(data[x].date.slice(5));
                        this.state.weightData.datasets[0].data.push(data[x].weight);
                    }
                }
                else{
                    for (let x = data.length-6; x < data.length; x++) {
                        this.state.weightData.labels.push(data[x].date.slice(5));
                        this.state.weightData.datasets[0].data.push(data[x].weight);
                    }
                }
                this.setState({ weightStats: calcStats(this.state.weightData.datasets[0]) });
            })
            .catch((err) => {
                console.log(err);
            })
    }
    enterWeight() {
        AlertIOS.prompt(
            'Log Weight',
            'What is your new weight?',
            [
                {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'Update',
                    onPress: (weight) => {
                        this.logWeight(weight);
                    }
                },
            ],
            'plain-text',
            '',
            'numeric'
        );
    }

    async logWeight(weight) {
        let date = new Date();
        let offsetInHours = date.getTimezoneOffset() / 60;
        date.setHours(date.getHours() - offsetInHours);
        let dateString = date.toJSON().slice(0, 10);

        let newWeight = {
            date: dateString,
            weight: Math.round(+weight)
        }

        editWeight(newWeight).then(() => {
            setTimeout(() => {
                this.loader();
            }, 300);
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.containerIOS}>
                <View style={styles.loggingContainer}>
                    <View style={styles.numberContainer}>
                        <Text style={styles.trackingNumber}>{this.state.loaded ? this.state.weight : 0}</Text>
                        <Text style={styles.trackingText}>lbs</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.trackingButton}
                            onPress={this.enterWeight.bind(this)}
                        >
                            <Text style={styles.buttonText}>Log Weight</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.graphsContainer}>
                    <View style={styles.graphCard}>
                        <Text style={styles.graphText}>History</Text>
                        <View>
                            { 
                            this.state.weightData.labels.length > 0?
                                <LineChart
                                    data={this.state.weightData}
                                    width={screenWidth * .80}
                                    height={190}
                                    chartConfig={chartConfig}
                                />:
                            <Text>Loading...</Text>
                         }

                        </View>

                    </View>
                    {
                       this.state.weightStats.data.length > 0? 
                        <View style={styles.graphStats}>
                            <Text style={{ paddingLeft: '1%', fontSize: 18, color: 'white' }}>
                                Min: {this.state.weightStats.min} lbs
                                    </Text>
                            <Text style={{ fontSize: 18, color: 'white' }}>
                                Max: {this.state.weightStats.max} lbs
                                    </Text>
                            <Text style={{ paddingRight: '1%', fontSize: 18, color: 'white' }}>
                                Average: {this.state.weightStats.average} lbs
                                    </Text>
                        </View>:
                    <Text>Loading...</Text>
                    }
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
        borderRadius: 15,
        backgroundColor: '#fff',
    },
    graphLabel: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    graphStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        width: '100%',
        backgroundColor: '#00adf5',
        borderRadius: 5,
    },
    graphTitle: {
        backgroundColor: 'white',
    },
    graphText: {
        fontSize: 22,
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'underline'
    }
});