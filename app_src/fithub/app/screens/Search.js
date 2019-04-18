import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    StatusBar,
    Platform,
    ScrollView,
    TouchableOpacity,
    Alert,
    RefreshControl,
    FlatList,
    ListItem
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import ProfileCard from '../components/ProfileCard';
import { getUsers } from '../lib/SocialFunctions';


export default class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            search: '',
            users: [],
            searchedUsers: [],
        };
    }
    

    
    componentDidMount() {
    getUsers().then(users => {
        this.setState({
        users: users
        });
    });
    }

    async updateSearch(search) {
        await this.setState({ search: search });
        await this.searchFilterFunction(this.state.search.toString());
    };

    searchFilterFunction = text => {    
        const newUsers = this.state.users.filter(user => {      
            const itemUser = `${user.pseudonym.toUpperCase()}`;
            const textData = text.toUpperCase();
                
            return itemUser.indexOf(textData) > -1;    
        });    
        this.setState({ searchedUsers: newUsers });  
    };


    render() {
        return(
            <SafeAreaView style={{flex: 1}}>
                <SearchBar
                    placeholder= 'Search'
                    onChangeText={text => this.updateSearch(text)}
                    value={this.state.search}
                    lightTheme={true}
                    round={true}
                />
                <View style={styles.searchResults}>
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.searchedUsers}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={()=>this.props.navigation.push('Profile', {id: item._id})}>
                                <ProfileCard
                                    user={item.pseudonym}
                                />
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    searchResults: {
        flex: 1,
        backgroundColor: '#eee',
    }
});