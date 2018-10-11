var express = require('express');

var app = express();
var apiRoutes = express.Router();

apiRoutes.use(function(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {

    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
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
