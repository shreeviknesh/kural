const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const path = require('path');
router.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/login.html'), {root: ''});
});

router.post('', (req, res) => {
    const userid = req.body.userid;
    const password = req.body.password;

    res.send(req.body);
});

module.exports = router;