var express = require('express');
var path = require('path');
var app =module.exports = express();
var config = require('./config');
var exphbs  = require('express-handlebars');


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || config.get('port'));


app.use(express.static(path.join(__dirname, 'public')));

require('./routes/singup');

app.listen(app.get('port'), function(){
  console.log('server start on' + app.get('port'));
});
