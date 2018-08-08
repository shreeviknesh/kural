const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', {
        title: 'Login to Kural',
        loginActive: true //means that the login page is active (not register page)
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

                res.send(isMatch);
            })
        } else {
            res.send('User not found');
        }
    })
});

module.exports = router;