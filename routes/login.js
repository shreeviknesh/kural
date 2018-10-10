const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

let title = 'Login to Kural';

router.get('/', (req, res) => {
    res.render('login/login');
});

router.post('/',
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }), (req, res) => {
        res.redirect('/');
    });

//Password Reset
router.get('/reset', (req, res) => {
    res.render('login/reset');
});

router.post('/reset', (req,res) => {
     User.findUser(req.body.userid, (err, user) => {
        if(err) throw err;

        if(user) {
            const temporaryPassword = require('../config/mail.js')(user);
            req.flash('success', 'Please enter the password sent in the registered email ID as password to login, do not forget to change your password after logging in!');
            res.redirect('/login');
        } else {
            req.flash('error', 'Unable to find User.')
            res.redirect('/login/reset');
        }
    });
});

module.exports = router;