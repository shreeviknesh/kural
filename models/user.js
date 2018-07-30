const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userID: {
        type: Number,
        index: true
    },
    address: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);