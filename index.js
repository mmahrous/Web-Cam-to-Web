var v4l2camera = require("v4l2camera");
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');

var cam = new v4l2camera.Camera("/dev/video0");
cam.start(); 

app.use('/', express.static(path.join(__dirname, 'stream')));
 
 
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// start socket 
var sockets = {};

io.on('connection', function(socket) {
 
  sockets[socket.id] = socket;
  console.log("Total clients connected : ", Object.keys(sockets).length);
 
  socket.on('disconnect', function() {
    delete sockets[socket.id];
 
    // no more sockets, kill the stream
    if (Object.keys(sockets).length == 0) {
      app.set('watchingFile', false);
      fs.unwatchFile('./stream/image_stream.jpg');
    }
  });
 
  socket.on('start-stream', function() {
    startStreaming(io);
  });
 
});
 
http.listen(8080, function() {
  console.log('listening on *:8080');
});
 
function stopStreaming() {
  if (Object.keys(sockets).length == 0) {
    app.set('watchingFile', false);
    if (proc) proc.kill();
    fs.unwatchFile('./stream/image_stream.jpg');
    cam.stop();
  }
}
function startStreaming(io) {
  if (app.get('watchingFile')) {
    io.sockets.emit('liveStream', 'image_stream.jpg?_t=' + (Math.random() * 100000));
    return;
  }
  Capture();
  app.set('watchingFile', true);
  console.log('Start watching......');
}
// Capture function 200 means 30fps
function Capture(){	
	setInterval(function(){
		cam.capture(function (success) {
		  var frame = cam.frameRaw();
		  io.sockets.emit('liveStream', "data:image/png;base64," + Buffer(frame).toString('base64'));
		});
	}, 200); 	
}
 

