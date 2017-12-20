var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/schema');
var database = require('../model/database');

/* GET all blog messages */
router.get('/get', function(req, res, next) {
    schema.Message.find({}).exec(function (err, messages) {
        if (err)
            return console.error(err);
        console.log("Load success: ", messages);
        res.send(messages);
    });

});

/* POST single blog post */
router.post('/post', function(req, res, next) {
    var instance = new schema.Message(req.body);
    schema.Message.find({}).sort({_id:-1}).skip(10).exec(function (err, messages) {
        if (err)
            return console.error(err);
        console.log("Loader success: ", messages);
        messages.forEach(function(message){
            console.log("Loader success: ", message);
            schema.Message.findByIdAndRemove(message._id).exec();
        });
    });

    instance.save(function (err, Message) {
        result = err?err:Message;
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
    schema.Message.find({}).exec(function (err, messages) {
        if (err)
            return console.error(err);
        //console.log("Load success: ", blogs);
        var toNotify = client?new Array(client):router.clients;
        toNotify.forEach(function(socket){
            socket.emit('refresh', messages);
        })
    });
}
module.exports = router;