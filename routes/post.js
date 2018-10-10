const router = require('express').Router();
const Post = require('../models/post');

router.post('/post', (req, res) => {
	if(req.isAuthenticated()) {
		const postContent = req.body.postContent;

		const newPost = new Post({
			userID: req.user.userID,
			content: postContent,
			status: 0,
			support: 0,
			opposition: 0,
			date: new Date().toLocaleDateString(),
			time: new Date().toLocaleTimeString('en-US', {
				hour12: false,
				hour: "numeric",
				minute: "numeric"
			})
		});

		Post.createPost(newPost, (err, post) => {
        if(err) throw err;
        console.log(post);
    });

	res.redirect('/');

    } else {
        req.flash('error_msg', 'Please login to continue.');
        res.redirect('/login');
    }
});

module.exports = router;
