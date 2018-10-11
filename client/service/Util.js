import React from "react";

export default class Util extends React.Component {
    constructor(props, authToken) {
        super(props);
        this.state = {
            apiURL: 'http://192.168.43.58:3000'
        };
        if (!(authToken === '')) {
            this.token = authToken;
        } else {
            this.token = '';
        }
    }

    login(login, password) {
        var credentials = {
            'login': login,
            'password': password
        };

        var creds = Util.getFormBody(credentials);
        return fetch(this.state.apiURL + '/users/auth', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: creds
        })
            .then((response) => {
                return response.json();
            })
            .catch(error => {
                console.log("error at login: " + error.message);
                throw error;
            });
    }

    register(login, password) {
        console.log('regging');
        var credentials = {
            'login': login,
            'password': password
        };

        var creds = Util.getFormBody(credentials);
        return fetch(this.state.apiURL + '/users/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: creds
        })
            .then((response) => {
                return response.json();
            })
            .catch(error => {
                console.log("error at registration: " + error.message);
                throw error;
            });
    }


    getNotes() {
        console.log('token');
        console.log(this.token);
        return fetch(this.state.apiURL + '/notes/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                'x-access-token': this.token
            }

        })
            .then((response) => {
                console.log(response.json);
                return response.json();
            })
            .catch(error => {
                console.log("error at geting notes: " + error.message);
                throw error;
            });
    }

    createNote(message,author ) {
        var msg = {
            'message': message,
            'author':author
        };
        var creds = Util.getFormBody(msg);
        return fetch(this.state.apiURL + '/notes/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': this.token
            },
            body: creds

        })
            .then((response) => {
                return response.json();
            })
            .catch(error => {
                console.log("error at note creation: " + error.message);
                throw error;
            });
    }

    static getFormBody(details) {

        return Object
            .keys(details)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

    }

}
