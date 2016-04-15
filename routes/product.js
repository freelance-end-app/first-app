var app = require('../app');
var passport = require('passport');
var Product = require('../models/product');
var User = require('../models/User');


app.get('/product', function(req, res){
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
    res.redirect('/product');
  }
});

});

app.post('/editProduct', function(req, res){
  Product.update({name:req.body.selectName},{
    $set:{
      name:req.body.name,
      price:req.body.price
    }
  }, function(err, data){
    if (err){
      res.send(err);
    } else {
      res.redirect('/product');
    }

  });
});

app.get('/about', function(req, res){
  User.findOne({_id:req.query.id}, function(err, doc){
    if (err) {
      res.send(err);
    } else {
      res.send('<h2> This product belongs to User: '+ doc.name);
    }
  });

});
