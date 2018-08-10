const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', (req, res) => {
    res.render('register', {
        title: 'Register to Kural',
        navLinks: {
            'Login': {
                'current': false,
                'url': "login"
            },
            'Public': {
                'current': false,
                'url': "register/public"
            },
            'Government': {
                'current': false,
                'url': "register/government"
            }
        }
    });
});

router.get('/public', (req, res) => {
    res.render('register/public', {
        title: 'Public Registration',
        navLinks: {
            'Login': {
                'current': false,
                'url': "login"
            },
            'Public': {
                'current': true,
                'url': "register/public"
            },
            'Government': {
                'current': false,
                'url': "register/government"
            }
        }
    });
});

router.get('/government', (req, res) => {
    res.render('register/government', {
        title: 'Government Registration',
        navLinks: {
        'Login': {
            'current': false,
            'url': "login"
            },
            'Public': {
                'current': false,
                'url': "register/public"
            },
            'Government': {
                'current': true,
                'url': "register/government"
                }
        }
    });
});

router.post('', (req, res) => {
    const userid = req.body.userid;
    const email = req.body.email;
    const door = req.body.door;
    const street = req.body.street;
    const area = req.body.area;
    const pincode = req.body.pincode;
    const state = req.body.state;
    const city = req.body.city;
    const password = req.body.password1;

    const newUser = new User({
        userID: userid,
        email: email,
        address: '#' + door + ', ' + street + ', ' + area + '. ' + city + '-' + pincode + '. ' + state + '.',
        password: password
    });

    User.createUser(newUser, (err, user) => {
        if(err) throw err;
        console.log(user);
    });
    res.send('Registered Successfully');
});

module.exports = router;