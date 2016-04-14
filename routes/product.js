var app = require('../app');
var passport = require('passport');
var Product = require('../models/product');


app.get('/Product', function(req, res){
  if(req.user) {

  Product.find({userId:req.user.id}, function(err, products){
    if (err) {
      res.send(err);
    }
  res.render('product',{
    user:req.user,
    products:products
  });
});
} else
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
