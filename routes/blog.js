var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/schema');
var database = require('../model/database');

/* GET all blog messages */
router.get('/get', function(req, res, next) {
    schema.Chatroom.find({}).exec(function (err, blogs) {
        if (err)
            return console.error(err);
        console.log("Load success: ", blogs);
        res.send(blogs);
    });

});

/* POST single blog post */
router.post('/post', function(req, res, next) {
    var instance = new schema.Chatroom(req.body);
    /** Example post body:
     {
       "author": "Morten Mathiasen",
       "body": "Hello everyone"
     }
     **/

    schema.Chatroom.find({}).sort({_id:-1}).skip(10).exec(function (err, blogs) {

        if (err)
            return console.error(err);
        blogs.forEach(function(blog){
            console.log("Loader success: ", blog);
            schema.Chatroom.findByIdAndRemove(blog._id).exec();
        });
    });

    instance.save(function (err, Blog) {
        result = err?err:Blog;
        res.send(result);
        router.notifyclients();
        return result;
    });
});


/* Notify blog messages to connected clients */
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

//export the router
module.exports = router;
