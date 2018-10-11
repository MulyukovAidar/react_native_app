import React, {Component} from 'react';
import {Text, TextInput, View, Button, Alert} from 'react-native';
import Util from '../service/Util';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this._onPressLogin = this._onPressLogin.bind(this)
        this.state = {
            login: '',
            password: '',
            loggedIn: '',
            token: '',
        };
    }


    render() {
        return (
            <View style={{padding: 10}}>
                <Text>Welcome to login page </Text>
                <TextInput
                    style={{height: 40}}
                    placeholder="login"
                    onChangeText={(value) => this.setState({login: value})}
                    value={this.state.login}
                    // onChangeText={(text) => {this.setState({text}),this.state.login = text}}
                />
                <TextInput
                    secureTextEntry={true}
                    style={{height: 40}}
                    placeholder="password"
                    onChangeText={(value) => this.setState({password: value})}
                    value={this.state.password}


                    // onChangeText={(text) => {this.setState({text}), this.state.password = text}}
                />
                <Button
                    onPress={this._onPressLogin}
                    title='Login'
                    color='blue'
                />

            </View>
        );
    }


    _onPressLogin() {
        const log = new Util(this.props, '');
        log.login(this.state.login, this.state.password)
            .then(responseJSON => {
                console.log('trying to login');
                console.log(responseJSON);
                if ((responseJSON.success === true)) {
                    this.setState({token: responseJSON.token});
                    this.props.navigation.navigate('Notes', {token: responseJSON.token});
                }
            })
            .catch(error => Alert.alert("Error", error.message));
    }

}
