var nodemailer = require('nodemailer');
var app = require('../app');
var User = require('../models/User');
var config = require('../config');


var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: config.get('emailUser'),
        pass: config.get('emailPass')
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
