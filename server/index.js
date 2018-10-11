var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


module.exports = {
    'secret': 'secret'
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('secret', 'secret');

//const apiRoutes = require('./middleware/mid');
const notesRoutes = require('./routes/notes');
const usersRoutes = require('./routes/users');

//app.use('/notes', apiRoutes);
app.use('/users', usersRoutes);

var apiRoutes = express.Router();

apiRoutes.use(function (req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {

        jwt.verify(token, app.get('secret'), function (err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {

        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

app.use('/notes', apiRoutes);
app.use('/notes', notesRoutes);

app.listen(3000);
