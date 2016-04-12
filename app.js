var express = require('express');
var path = require('path');
var app = module.exports = express();
var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('express-flash');

var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var config = require('./config');
var exphbs  = require('express-handlebars');
var multipartyCon = require('connect-multiparty');
var multipartyMiddelwere = multipartyCon();

require('./models/User');

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    user.comparePassword(password, function(err, isMatch) {
      if (isMatch) {

        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

var User = require('./models/User');

mongoose.connect(config.get('db_path'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(multipartyMiddelwere);

app.set('port', process.env.PORT || config.get('port'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'session secret key',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());



app.use(express.static(path.join(__dirname, 'public')));

require('./routes/singup');
require('./routes/login');
require('./routes/home');

app.listen(app.get('port'), function(){
  console.log('server start on' + app.get('port'));
});
