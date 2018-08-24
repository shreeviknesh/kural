const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('register/register');
});

router.get('/public', (req, res) => {
    res.render('register/public');
});

router.get('/government', (req, res) => {
    res.render('register/government');
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

    req.flash('success_msg', 'Registered Successfully');
    res.redirect('/login');
});

module.exports = router;