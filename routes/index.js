const express = require('express');
const router = express.Router();

router.get('/',  (req, res) => {
    if(req.isAuthenticated()) {
        res.render('main', {
            layout: 'innerLayout'
        });
    } else {
        res.render('welcome');
    }
});

router.get('/logout', (req, res) => {
    if(req.isAuthenticated()) {
        req.logout();
        req.flash('success_msg', 'Logged out successfully.');
    } else {
        req.flash('error_msg', 'Please login to continue.');
    }
    res.redirect('/login');
})

module.exports = router;