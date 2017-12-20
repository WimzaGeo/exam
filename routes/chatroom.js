var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/schema');
var database = require('../model/database');

/* GET all blog messages */
router.get('/get', function(req, res, next) {
    schema.Chatroom.find({}).exec(function (err, chatrooms) {
        if (err)
            return console.error(err);
        console.log("Load success: ", chatrooms);
        res.send(chatrooms);
    });

});
router.get('/getAllCurrentUsers/:id', function(req, res, next) {
    schema.Chatroom.findById(req.params.id).exec(function (err, chatrooms) {

        if (err)
            return console.error(err);
        console.log("Load success: ", chatrooms);
        res.send(chatrooms.users);
    });

});

/* POST single blog post */
router.post('/post', function(req, res, next) {
    var instance = new schema.Chatroom(req.body);
    schema.Chatroom.find({}).sort({_id:-1}).skip(10).exec(function (err, chatrooms) {
        if (err)
            return console.error(err);
        console.log("Loader success: ", chatrooms);
        chatrooms.forEach(function(chatroom){
            console.log("Loader success: ", chatroom);
            schema.Chatroom.findByIdAndRemove(chatroom._id).exec();
        });
    });

    instance.save(function (err, Chatroom) {
        result = err?err:Chatroom;
        res.send(result);
        router.notifyclients();
        return result;
    });
});
router.get('/getMessage/:id', function(req, res, next) {
    schema.Chatroom.findById(req.params.id).exec(function (err, chatrooms) {
        console.log("REEEEEEEEEEEEEEEEE!!!!!!!!!!!!!!!!!!!");
        if (err)
            return console.error(err);
        console.log("Load success: ", chatrooms);
        res.send(chatrooms);
    });
});
router.post('/postMessage', function(req, res, next) {
    var instance = new schema.Chatroom(req.body);
    schema.Chatroom.findById(instance._id).exec(function (err, exsiting_room) {
        exsiting_room.messages = instance.messages;
        exsiting_room.save(function (err, Chatroom) {
            result = err?err:Chatroom;
            res.send(result);
            router.notifyMessage(instance._id);
            return result;
        });
    });
});
router.clients = [];
router.addClient = function (client) {
    router.clients.push(client);
    router.notifyclients(client);
};
router.notifyMessage = function (_id,client) {
    schema.Chatroom.findById(_id).exec(function (err, chatroom) {
        if (err)
            return console.error(err);
        //console.log("Load success: ", blogs);
        var toNotify = client?new Array(client):router.clients;
        toNotify.forEach(function(socket){
            socket.emit('newMessage', chatroom.messages);
        })
    });
}
router.notifyclients = function (client) {
    schema.Chatroom.find({}).exec(function (err, chatrooms) {
        if (err)
            return console.error(err);
        //console.log("Load success: ", blogs);
        var toNotify = client?new Array(client):router.clients;
        toNotify.forEach(function(socket){
            socket.emit('refresh', chatrooms);
        })
    });
}
module.exports = router;