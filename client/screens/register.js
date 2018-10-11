import React, {Component} from 'react';
import {Text, TextInput, View, Button, Alert} from 'react-native';
import Util from '../service/Util';

export default class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this._onPressRegister = this._onPressRegister.bind(this)
        this.state = {
            login: '',
            password: ''
        };
    }


    render() {
        return (
            <View style={{padding: 10}}>
                <Text>Register</Text>
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
                    onPress={this._onPressRegister}
                    title='Register'
                    color='blue'
                />
                <Text></Text>

                <Button
                    title="Go to Login"
                    color='blue'
                    onPress={() => this.props.navigation.navigate('Login')}
                />
            </View>
        );
    }


    _onPressRegister() {
        const reg = new Util(this.props, '');
        // console.log(this.state.login);
        // console.log(this.state.password);

        reg.register(this.state.login, this.state.password)
            .then(responseJSON => {
                if (responseJSON.success === true) {
                    this.props.navigation.navigate('Login');
                    console.log('success');
                } else {
                    // this.props.navigation.navigate('Registration');
                    console.log('error');
                }

            })
            .catch(error => Alert.alert("Error", error.message));
    }

}
