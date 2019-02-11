import React from 'react';
import { Icon } from 'react-native-elements';

class BottomBar extends React.Component{
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'stretch',
            }}>
            <Icon
                name="account"
                type="material-community"
                size={20}
            />
            <Icon
                name="book"
                type="material-community"
            />
            </View>
        );
    }
}