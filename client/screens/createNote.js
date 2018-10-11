import React, {Component} from 'react';
import {Text, TextInput, View, Button, Alert, Flatlist} from 'react-native';
import Util from '../service/Util';

export default class NotesScreen extends React.Component {

    constructor(props) {
        super(props);

        const {navigation} = this.props;
        const apiToken = navigation.getParam('token', '');

        this.state = {
            message: '',
            token: apiToken,
            author:'Anonymous',
            successMessage:''
        };
    }

    render() {
        return (
            <View>
                <TextInput
                    style={{height: 60}}
                    placeholder="Choose your pseudonim"
                    onChangeText={(text) => this.setState({author: text})}
                />
                <TextInput
                    style={{height: 160}}
                    placeholder="Enter your note"
                    onChangeText={(text) => this.setState({message: text})}
                />
                <Button
                    style={{height: 30, paddingTop: 10}}
                    onPress={this.createNote}
                    title='Post'
                    color='blue'
                />
                <Text></Text>
                <Text>{this.state.successMessage}</Text>
            </View>
        );
    }







    createNote = () => {

        const notes = new Util(this.props, this.state.token);
        // console.log('token in notes.js');
        // console.log(this.state.token);

        notes.createNote(this.state.message,this.state.author)
            .then(responseJSON => {
                console.log(responseJSON);
                this.setState({successMessage:'Note creation successfull'});
                this.props.navigation.navigate('Notes',{token:this.state.token})
            })
            .catch(error => {
                Alert.alert("Error", error.message);
                throw new Error(error);
            });

    };

}
