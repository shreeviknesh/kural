const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

const path = require('path');
router.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/login.html'), {root: ''});
});

router.post('', (req, res) => {
    const userid = req.body.userid;
    const password = req.body.password;

    // res.send("POSTED Login Page");
    res.send(req.body);
});

module.exports = router;