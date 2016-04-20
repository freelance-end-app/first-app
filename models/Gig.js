var mongoose = require('mongoose');

var gigSchema = new mongoose.Schema({
	userId: String,
	userName: String
});

module.exports = mongoose.model('gigs', gigSchema);



var gig = new Gig({
        userId: req.user.id,
        userName: req.body.name
    });
gig.save(function (err) {
      if(err) {
        res.send(err);
      } else {
        console.log("Gig add succesufull");
      }
    });