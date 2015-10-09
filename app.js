var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var redis = require('redis');
//var redisClient = redis.createsocket();

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
	socket.on('join', function(name){
		socket.name = name;
		console.log('User has conected: ' + name);
	});

	socket.on('message', function(message){
		console.log(socket.name + ': ' + message);
		socket.broadcast.emit('chat message', socket.name + ':\n' + message);
		socket.emit('chat message', socket.name + ':\n' + message);
	});
});

http.listen(3000, function(){
	console.log('Node has started');
});