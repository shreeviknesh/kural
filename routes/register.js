const express = require('express');
const router = express.Router();

let navLinks = {
    'Login': {
        'current': false,
        'url': "login"
    },
    'Public': {
        'url': "register/public"
    },
    'Government': {
        'url': "register/government"
    }
};

router.get('/', (req, res) => {
    navLinks.Public.current = false;
    navLinks.Government.current = false;
    res.render('register', {
        title: 'Register to Kural',
        navLinks: navLinks
    });
});

router.get('/public', (req, res) => {
    navLinks.Public.current = true;
    navLinks.Government.current = false;
    res.render('register/public', {
        title: 'Public Registration',
        navLinks: navLinks
    });
});

router.get('/government', (req, res) => {
    navLinks.Public.current = false;
    navLinks.Government.current = true;
    res.render('register/government', {
        title: 'Government Registration',
        navLinks: navLinks
    });
});

const User = require('../models/user.js');
router.post('/public', (req, res) => {
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