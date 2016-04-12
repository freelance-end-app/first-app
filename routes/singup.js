var app = require('../app');
var User = require('../models/User');

var passport = require('passport');
var fs = require('fs');
var S3FS = require('s3fs');
var multipartyCon = require('connect-multiparty');
var multipartyMiddelwere = multipartyCon();
var s3fsImpl = new S3FS('yurakovalchuktest', {
  acl: 'FULL_CONTROL	',
  accessKeyId: 'AKIAJYVBUAWAYAI3ZPMQ',
  secretAccessKey: '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'
});



app.get('/singup', function(req, res){
  res.render('singUp');
});

app.post('/singup', function(req, res) {
var user = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    picture: req.body.picture,
    password: req.body.password
  });
    user.save(function(err) {
      if (err){
    res.send(err);
  } else  res.render('about', {
    pic: req.body.picture
  });

  });
});

app.post('/send', function(req, res){
  console.log(req.host);
  var file = req.files.image;
  var stream = fs.createReadStream(file.path);
   return s3fsImpl.writeFile(file.originalFilename, stream).then(function(){
    fs.unlink(file.path, function(err){
      if (err) console.error(err);
    });

    res.render('singUp', {
      name: file.originalFilename
    });
  var data = { name : file.originalFilename
              };
  });
});
