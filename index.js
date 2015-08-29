var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);



user_count = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  
  //increase the number of users and send the count 
  user_count = user_count + 1;
  io.emit('dashboard message', user_count);
  
  //send chat msg 
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


