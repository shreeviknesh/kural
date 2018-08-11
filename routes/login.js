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

module.exports = router;