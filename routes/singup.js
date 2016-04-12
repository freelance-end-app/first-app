var app = require('../app');
var User = require('../models/User');

var passport = require('passport');



app.get('/singup', function(req, res) {
    res.render('singUp');
});

app.post('/singup', function(req, res) {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        isVerified: false
    });

    user.save(function(err) {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/send?email=' + req.body.email);
        }

    });
});
