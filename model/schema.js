var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exports = module.exports = {};

exports.blogSchema = new Schema({
    author: String,
    body:   String
});

exports.userSchema = new Schema({
    userName: String
});

exports.messageSchema = new Schema({
    user: [],
    message: String
})
exports.User = mongoose.model('User', exports.userSchema);
exports.Message = mongoose.model('Message', exports.messageSchema)

exports.chatroomSchema = new Schema({
    messages:[exports.messageSchema],
    name:String,
    users: [exports.userSchema]
});


exports.Blog = mongoose.model('Blog',exports.blogSchema);
exports.Chatroom = mongoose.model('Chatroom', exports.chatroomSchema);