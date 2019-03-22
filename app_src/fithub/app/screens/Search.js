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

        console.log(props.navigation);
    
        this.state = {
            search: '',
            users: [],
        };
    }
    updateSearch = search => {
        this.setState({ search });
        getSearchResults(this.state.search);
    };

    
      componentDidMount() {
        getUsers().then(users => {
            console.log(users);
          this.setState({
            users: users
          });
        });
      }

    getSearchResults(search){
        
    }

    render() {
            this.getSearchResults();
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
                            data={this.state.users}
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