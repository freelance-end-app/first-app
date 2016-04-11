var app = require('../app');

app.get('/about', function(req, res){
  res.render('about');
});
