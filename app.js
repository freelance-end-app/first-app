var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var config = require('./config');
var exphbs = require('express-handlebars');
var User = require('./models/User');

var app = module.exports = express();

mongoose.connect(config.get('db_path'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || config.get('port'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

require('./routes/singup');
require('./routes/login');
require('./routes/home');

var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "fedyshyn.roma@gmail.com",
        pass: "hQ13242128Wqe1"
    }
});
var rand, mailOptions, host, link;

app.get('/send', function(req, res) {
    rand = Math.floor((Math.random() * 100) + 43);
    host = req.get('host');
    link = "http://" + host + "/verify?id=" + rand;
    mailOptions = {
        to: req.query.email,
        subject: "Please confirm your Email account",
        html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    };

    console.log(mailOptions);

    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});

app.get('/verify', function(req, res) {
    console.log(req.protocol + ":/" + req.get('host'));
    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
        console.log("Domain is matched. Information is from Authentic email");
        if (req.query.id == rand) {
            console.log("email is verified");
            res.end("<h1>Email " + mailOptions.to + " is been Successfully verified");

            User.update({ email: mailOptions.to }, { $set: { isVerified: true } }, function(err, user) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(user);
                }
            });
        } else {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    } else {
        res.end("<h1>Request is from unknown source");
    }
});






app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
