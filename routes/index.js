const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('main', {
        title: 'Welcome to Kural',
        navLinks: {
            'Login': {
                'current': false,
                'url': "login"
                },
            'Register': {
                    'current': false,
                    'url': "register"
                }
        }
    });
});

module.exports = router;