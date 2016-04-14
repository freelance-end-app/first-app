var app = require('../app');
var passport = require('passport');
var Product = require('../models/product');


app.get('/addProduct', function(req, res){
  res.render('product', {
    user:req.user
  });
});

app.post('/addProduct', function(req, res){
  var product = new Product({
    name:req.body.name,
    price:req.body.price,
    userId:req.user.id,
    purchases:{}
  });
product.save(function(err){
  if (err) {
  res.send(err);
  } else {
    res.redirect('/addProduct');
  }
});

});
