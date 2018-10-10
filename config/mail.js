var nodemailer = require('nodemailer');
var temporaryPassword = require('uuid/v4')();

module.exports = sendMail = email => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kuralresponse@gmail.com',
      pass: 'arjuncr1818'
    }
  });

  var options = {
    from: 'Kural',
    to: email,
    subject: 'Password reset request for Kural account',
    text: `Please use the following Password to login: ${temporaryPassword}`
  };

  transporter.sendMail(options, (err, info) => {
    if (err) throw(err);
    console.log(`Email sent: ${info.response}`);
  });

  return temporaryPassword;
}
