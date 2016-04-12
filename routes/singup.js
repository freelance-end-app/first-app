var app = require('../app');
var User = require('../models/User');

var passport = require('passport');
var fs = require('fs');


app.get('/singup', function(req, res) {
    res.render('singUp',{
      user:req.user
    });
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
app.get('/edit', function(req, res) {
  var user = req.user.username;

  if (!user) {
    res.redirect('/');
  }

  User.findOne({ username: user }, function(err, user){
    if(err){
      res.redirect('/');
    }
    res.render('singUp', {
      user: req.user
    });
  });
});

app.post('/edit', function(req, res) {
  var user = req.user.username;

  if (!user) {
    res.redirect('/');
  }

  User.findOne({ username: user }, function(err, user){
    if(err){
      res.redirect('/');
    }

    user.username = req.body.username,
    user.email = req.body.email,
    user.password = req.body.password,
    user.name = req.body.name

    user.save(function(err) {
      req.logIn(user, function(err) {
        res.redirect('/');
      });
    });
  });
});
