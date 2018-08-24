const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	let user = false;
	let layout = user ? 'innerLayout.hbs' : 'outerLayout.hbs';
    res.render('main', {
    	user: user,
    	layout: layout,
        title: 'Welcome to Kural'
    });
});

module.exports = router;