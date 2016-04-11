var express = require('express');
var path = require('path');
var app = module.exports = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');
var exphbs  = require('express-handlebars');

var User = require('./models/User');
mongoose.connect(config.get('db_path'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || config.get('port'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));

require('./routes/singup');
require('./routes/login');
require('./routes/home');

app.listen(app.get('port'), function(){
  console.log('server start on' + app.get('port'));
});
