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


export default class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        search: '',
        profiles: [
            {user: 'Brian'},
            {user: 'Andy'},
            {user: 'Colin'},
        ],
    };
    
    updateSearch = search => {
        this.setState({ search });
        getSearchResults(this.state.search);
    };

    getSearchResults(search){
        
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
                        data={this.state.profiles}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={()=>this.props.navigation.push('otherUserProfile')}>
                            <ProfileCard
                                user={item.user}
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