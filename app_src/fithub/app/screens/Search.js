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
    updateSearch = search => {
        this.setState({ search: search });
        this.getSearchResults(this.state.search);
    };

    
      componentDidMount() {
        getUsers().then(users => {
          this.setState({
            users: users
          });
        });
      }

    getSearchResults(search){
        //console.log(search);
        this.state.searchedUsers.length = 0;
        for (let i=0; i < this.state.users.length; i++){
            console.log(this.state.users[i].pseudonym.includes(search))
            if(this.state.users[i].pseudonym.includes(search)){
                this.state.searchedUsers.push(this.state.users[i]);
            }
        }
        //console.log(this.state.searchedUsers);
    }

    render() {
        return(
            <SafeAreaView style={{flex: 1}}>
                <SearchBar
                    placeholder= 'Search'
                    onChangeText={this.updateSearch}
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
    }
});