var mongoose = require('mongoose');

var gigSchema = new mongoose.Schema({
	userId: String,
	userName: String
});

module.exports = mongoose.model('gigs', gigSchema);