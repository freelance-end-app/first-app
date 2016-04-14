var app = require('../app');
var passport = require('passport');
var User = require('../models/User');
var  mongoose = require('mongoose');

var Products = require('../models/product');



app.get('/', function(req, res){
  if(req.user) {

  Products.find({userId:req.user.id}, function(err, products){
    if (err) {
      res.send(err);
    }
  res.render('home',{
    user:req.user,
    products:products
  });
});
} else
res.render('home', {
  user:req.user
});
});
