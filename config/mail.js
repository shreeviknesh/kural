var nodemailer = require('nodemailer');
var otp = Math.floor(Math.random() * 89999) + 10000;

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
    text: `Please use the following Password to login: ${otp}.`;
  };

  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });

  return otp;
}
