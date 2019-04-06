import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';
import { Icon } from 'react-native-elements'

export default class SignInScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shadowProps: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 1,
                    height: 2,
                },
                shadowOpacity: .4,
                shadowRadius: 3,
            }
        }
    }

    render() {
        return(
            // <View style={styles.page}>
            //     {/*HEADER: FitHub logo*/}
            //     <View style={styles.header}>
            //         <Image 
            //             source={require('../../assets/FitHub-transparent.png')}
            //             style={styles.headerImage}
            //         />
            //     </View>
            //     {/*CONTENT: Login ~ Login With Google*/}
            //         {/*HEADING: Login*/}
            //         <View style={styles.heading}>
            //             <Text style={styles.headingText}>
            //                 Welcome to FitHub!
            //             </Text> 
            //             <Text style={styles.subheadingText}>
            //                 Please sign in to get started
            //             </Text>
            //         </View>
            //         <View style={styles.buttonView}>
            //             <TouchableOpacity onPress={this.props.signIn}>
            //                 <Image
            //                     source={require('../../assets/sign-in-with-google.png')}
            //                     style={styles.buttonImage}
            //                 />
            //             </TouchableOpacity>
            //         </View>
            // </View> 
            
            <View style={styles.containerIOS}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Fit<Text style={styles.headerTextHighlight}>Hub</Text></Text>
                    <Text style={styles.subHeaderText}>workout logging simplified.</Text>
                </View>

                <View style={styles.iconsContainer}>
                    <Icon name="dumbbell" type="material-community" size={50} color={'#00adf5'} reverse raised/>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="food-apple" type="material-community" size={50} color={'#00adf5'} reverse raised/>
                        <Icon name="run" type="material-community" size={50} color={'#00adf5'} reverse raised/>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.props.signIn} style={[styles.loginButton, this.state.shadowProps]}>
                        <Image
                            source={require('../../assets/google_logo.png')}
                            style={styles.loginButtonImage}
                        />
                        <Text style={styles.loginButtonText}>Sign In With Google</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerIOS: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    iconsContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 128,
        fontWeight: 'bold',
    },
    headerTextHighlight: {
        fontSize: 128,
        fontWeight: 'bold',
        color: '#00adf5',
    },
    subHeaderText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    icon: {
        color: '#00adf5',
    },
    loginButton: {
        flexDirection: 'row',
        width: '90%',
        height: 80,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    loginButtonImage: {
        width: 50,
        height: 50,
    },
    loginButtonText: {
        fontSize: 28,
        fontWeight: 'bold',
    },

    page: {
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    header: {
        flex: 0,
        justifyContent: 'center',

    },
    headerImage: {
        width: 200,
        height: 100,
        resizeMode: 'contain',
    },
    content: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    heading: {
    },
    headingText: {
        fontSize: 32,
        paddingTop: 5,
        paddingBottom: 5,
    },
    subheadingText: {
        fontSize: 24,
        paddingTop: 3,
        paddingBottom: 3,
    },
    buttonView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
    buttonImage: {
        height: 75,
        width: 300,
    },
});
