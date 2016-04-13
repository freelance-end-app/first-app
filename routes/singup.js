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
        picture: req.body.picture,
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

  User.update({username:req.body.username},
				{ $set: {
					name:req.body.name,
					email:req.body.email,
          picture:req.body.picture
				}
				}, function (err, data){
					if (err) {
						res.json(err);
					} else res.redirect('/');
				});


});
