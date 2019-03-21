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


export default class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        search: '',
    };
    
    updateSearch = search => {
        this.setState({ search });
        getSearchResults(this.state.search);
    };

    getSearchResults(search){
        
    }

    render() {
        return(
            <SafeAreaView>
                <SearchBar
                    placeholder= 'Search'
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                    lightTheme={true}
                    round={true}
                />
                <Text>{this.state.search}</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    
});