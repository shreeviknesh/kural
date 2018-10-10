const User = require('../models/user');
const bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
var temporaryPassword = require('uuid/v4')();

module.exports = sendMail = user => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kuralresponse@gmail.com',
      pass: 'arjuncr1818'
    }
  });

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(temporaryPassword, salt, function(err, hash) {
        if(err)
          throw err;
        User.update({"userID": user.userID}, {$set: {"password": hash}}, (err, res) => {
        if(err) throw err;
        else
          console.log("success: "+res);
      });
    });
  });

  var options = {
    from: 'Kural',
    to: user.email,
    subject: 'Password reset request for Kural account',
    text: `Please use the following Password to login: ${temporaryPassword}`
  };

  transporter.sendMail(options, (err, info) => {
    if (err) throw(err);
    console.log(`Email sent: ${info.response}`);
  });

  return temporaryPassword;
}