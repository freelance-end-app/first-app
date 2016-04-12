var app = require('../app');
var passport = require('passport');
var User = require('../models/User');



app.get('/', function(req, res){
  res.render('home',{
    user:req.user
  });
});
