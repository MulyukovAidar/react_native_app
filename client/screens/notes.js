import React, {Component} from 'react';
import {Text, TextInput, View, Button, Alert, FlatList, StyleSheet} from 'react-native';
import Util from '../service/Util';

export default class NotesScreen extends React.Component {


    constructor(props) {
        super(props);

        const {navigation} = this.props;
        const apiToken = navigation.getParam('token', '');

        this.state = {
            token: apiToken,
            notes: []
        };

        const notes = new Util(this.props, this.state.token);
        // console.log('token in notes.js');
        // console.log(this.state.token);
        notes.getNotes()
            .then(responseJSON => {
                console.log(responseJSON);
                const data = responseJSON.notes.map(item => ({
                    author: item.author,
                    message: item.message
                }));
                console.log(data);
                this.setState({notes: data})
            })
    }

    render() {
        var notesEmptyMessage = this.state.notes.length === 0 ?
            <Text>Not a single note yet, try to add one</Text> : null;
        return (
            <View>
                <Button
                    title='Add a note'
                    color='blue'
                    onPress={() => this.props.navigation.push('CreateNote', {token: this.state.token})}
                />
                <Text></Text>
                <Button
                    color='blue'
                    title='Show recent notes'
                    onPress={this.handleList.bind(this)}
                />


                <FlatList
                    data={this.state.notes}
                    renderItem={({item}) =>
                        <View style={styles.container}>
                            <Text>{item.author}:</Text>
                            <Text>{item.message}</Text>
                        </View>
                    }
                />
            </View>
        );
    }

    handleList = () => {
        const notes = new Util(this.props, this.state.token);
        // console.log('token in notes.js');
        // console.log(this.state.token);
        notes.getNotes()

            .then(responseJSON => {
                console.log(responseJSON);
                const data = responseJSON.notes.map(item => ({
                    author: item.author,
                    message: item.message
                }));
                console.log(data);
                this.setState({notes: data})
            })
            .catch(error => {
                Alert.alert("Error", error.message);
                throw new Error(error);
            });

    };

}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },

});