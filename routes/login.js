const express = require('express');
const router = express.Router();

let navLinks = {
    'Login': {
        current: true,
        'url': 'login'
    },
    'Register': {
        current: false,
        'url': 'register'
    }
};
let title = 'Login to Kural';

router.get('/', (req, res) => {
    res.render('login', {
        title: title,
        navLinks: navLinks
    });
});

const User = require('../models/user');
router.post('', (req, res) => {
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
                    res.render('login', {
                        invalidAuthenticate: true,
                        errMsg: 'Incorrect Password',
                        title: title,
                        navLinks: navLinks
                    });
                } else {
                    res.send('Logged In');
                }
            })
        } else {
            res.render('login', {
                invalidAuthenticate: true,
                errMsg: 'Invalid Username',
                title: title,
                navLinks: navLinks
            });
        }
    })
});

//Password Reset
router.get('/reset', (req, res) => {
    res.render('password-reset', {
        navLinks: navLinks
    });
});

router.post('/reset', (req,res) => {
     User.findUser(req.body.userid, (err, user) => {
        if(err) throw err;

        if(user) {
            let mail = require ('./mail.js');
            var otp = mail(user.email);
            res.render('login', {
                misc: true,
                miscMsg: "Please enter the OTP sent in the registered email ID as password to login, do not forget to change your password after logging in.",
                navLinks: navLinks
            });
        } else {
            res.render('password-reset', {
                error: true,
                errMsg: "Unable to find Identification number",
                navLinks: navLinks
            });
        }
    });
});

module.exports = router;