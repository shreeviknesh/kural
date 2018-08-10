const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', {
        title: 'Login to Kural',
        navLinks: {
            'Login': {
                'current': true,
                'url': 'login'
            },
            'Register': {
                'current': false,
                'url': 'register'
            }
        }
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
                        errorMsg: 'Incorrect Password',
                        title: 'Login to Kural',
                        navLinks: {
                            'Login': {
                                'current': true,
                                'url': 'login'
                            },
                            'Register': {
                                'current': false,
                                'url': 'register'
                            }
                        }
                    });
                } else {
                    res.send('Logged In');
                }
            })
        } else {
            res.render('login', {
                invalidAuthenticate: true,
                errorMsg: 'Incorrect Username',
                title: 'Login to Kural',
                navLinks: {
                    'Login': {
                        'current': true,
                        'url': 'login'
                    },
                    'Register': {
                        'current': false,
                        'url': 'register'
                    }
                }
            });
        }
    })
});

module.exports = router;