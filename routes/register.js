const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

const path = require('path');
router.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/register.html'), {root: ''});
});

router.post('', (req, res) => {
    const userid = req.body.userid;
    const door = req.body.door;
    const street = req.body.street;
    const area = req.body.area;
    const pincode = req.body.pincode;
    const state = req.body.state;
    const city = req.body.city;
    let password1 = req.body.password1;
    let password2 = req.body.password2;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password1, salt, function(err, hash) {

        });
    });

    res.send("POSTED Register page");
});

module.exports = router;