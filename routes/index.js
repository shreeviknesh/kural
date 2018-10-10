const express = require('express');
const router = express.Router();
const Post = require('../models/post.js');

router.get('/',  (req, res) => {
    if(req.isAuthenticated()) {
        Post.getAllPosts((err, posts) =>{
            if(err) throw err;

            res.render('main', {
                layout: 'innerLayout',
                posts: posts.reverse()
            });
        });
    } else {
        res.render('welcome');
    }
});

router.get('/logout', (req, res) => {
    if(req.isAuthenticated()) {
        req.logout();
        req.flash('success', 'Logged out successfully.');
    } else {
        req.flash('error', 'Please login to continue.');
    }
    res.redirect('/login');
});

module.exports = router;