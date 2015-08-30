var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

user_names = "";
user_count = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/offers/', function(req, res){
  var offers = "{'offers':[{'offerid':1,'expiration_date':'2015-12-12','url':'http://www.yahoo.com','qr_code_url':'http://www.yahoo.com/qr_code.jpg',    'offer_value':25000,'detail_text':'','detail_html':''}]}";
  res.send(offers);
});

io.on('connection', function(socket){

  //send chat member list 
  socket.on('user authentication', function(user_name){
    user_names = user_names + "," + user_name;
    io.emit('dashboard message', user_names);
    console.log('user_name: ' + user_names);
  });
  
  //send chat msg 
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


