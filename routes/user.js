var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/schema');
var database = require('../model/database');

/* GET all blog messages */
router.get('/get/:id', function(req, res, next) {
    schema.User.find({}).exec(function (err, users) {
        if (err)
            return console.error(err);
        console.log("Load success: ", users);
        res.send(users);
    });

});

/* POST single blog post */
router.post('/post', function(req, res, next) {
    var instance = new schema.User(req.body);
    schema.User.find({}).sort({_id:-1}).skip(10).exec(function (err, users) {
        if (err)
            return console.error(err);
        console.log("Loader success: ", users);
        users.forEach(function(user){
            console.log("Loader success: ", user);
            schema.User.findByIdAndRemove(user._id).exec();
        });
    });

    instance.save(function (err, User) {
        result = err?err:User;
        res.send(result);
        return result;
    });
});
router.clients = [];
router.addClient = function (client) {
    router.clients.push(client);
    router.notifyclients(client);
};
router.notifyclients = function (client) {
    schema.Chatroom.find({}).exec(function (err, blogs) {
        if (err)
            return console.error(err);
        //console.log("Load success: ", blogs);
        var toNotify = client?new Array(client):router.clients;
        toNotify.forEach(function(socket){
            socket.emit('refresh', blogs);
        })
    });
}
module.exports = router;