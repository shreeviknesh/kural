const express = require('express');
const router = express.Router();

let title = 'Login to Kural';

router.get('/', (req, res) => {
    res.render('login/login', {
        title: title
    });
});

const User = require('../models/user');
router.post('/', (req, res) => {
    const userid = req.body.userid;
    const password = req.body.password;

    User.findUser(userid, (err, user) => {
        if(err)
            throw err;

        if(user) {
            User.comparePassword(password, user.password, (err, isMatch) => {
                if(err)
                    throw err;

                if(!isMatch) {
                    res.render('login/login', {
                        invalidAuthenticate: true,
                        errMsg: 'Incorrect Password',
                        title: title
                    });
                } else {
                    res.send('Logged In');
                }
            })
        } else {
            res.render('login/login', {
                invalidAuthenticate: true,
                errMsg: 'Invalid Username',
                title: title
            });
        }
    })
});

//Password Reset
router.get('/reset', (req, res) => {
    res.render('login/reset');
});

router.post('/reset', (req,res) => {
     User.findUser(req.body.userid, (err, user) => {
        if(err) throw err;

        if(user) {
            let mail = require ('./mail.js');
            var otp = mail(user.email);
            res.render('login', {
                misc: true,
                miscMsg: "Please enter the OTP sent in the registered email ID as password to login, do not forget to change your password after logging in."
            });
        } else {
            res.render('login/reset', {
                error: true,
                errMsg: "Unable to find Identification number"
            });
        }
    });
});

module.exports = router;