const router = require('express').Router();
const User = require('../models/user');

router.get('/profile', (req, res) => {
    if(req.isAuthenticated()) {
        res.render('profile', {
            layout: 'innerLayout'
        });
    } else {
        req.flash('error', 'Please login to continue')
        res.redirect('login');
    }

});

module.exports = router;
