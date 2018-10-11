const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync();
const jwt = require('jsonwebtoken');

var users = []


exports.getUsers = function (req, resp) {
    resp.json({
        status: "Get all users succeeded",
        users: users

    });
    // console.log(users);
}


exports.register = function (req, resp, next) {

    var newUser = {
        id: Math.random().toString(36).substring(7),
        login: req.body.login,
        password: bcrypt.hashSync(req.body.password, salt)
    }
    //console.log(newUser);
    users.push(newUser);
    resp.json({
        success: true,
        status: "User creation successfull"
    });
}

exports.auth = function (req, resp, next) {
    var user = users.find(user => {
        return user.login === req.body.login
    });
    if (!user) {
        resp.json({
            success: false,
            status: "User not found"
        });
    }
    else {
        console.log(user);
        console.log('USER FOUND');
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            resp.json({
                success: false,
                status: "Password incorrect"
            });
        }
        else {
            console.log('PASSWORD CORRECT');
            const payload = {
                id: user.id
            };
            var token = jwt.sign(payload, 'secret');
            resp.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });
        }
    }
}
