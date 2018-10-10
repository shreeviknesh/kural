const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    userID: {
        type: Number,
        index: true
    },
    content: {
        type: String,
        index: true
    },
    status: {
        type: Number
    },
    support: {
        type: Number
    },
    opposition: {
        type: Number
    },
    date: {
        type: String
    },
    time: {
        type: String
    }
});

let Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.createPost = (newPost, callback) => {
    newPost.save(callback);
}

module.exports.getAllPosts = (callback) => {
    Post.find(callback);
}
