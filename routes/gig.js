var app = require('../app');
var passport = require('passport');
var Product = require('../models/product');
var User = require('../models/User');
var Gig = require('../models/Gig');


app.post('/addGig', function(req, res) {
    var gig = new Gig({
        userId: req.user.id,
        userName: req.body.name
    });
    gig.save(function(err) {
        if (err) {
            res.send(err);
        } else {
        	res.redirect('/product');
            console.log("Gig add succesufull");
        }
    });
});
