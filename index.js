let express = require('express');
let socket = require('socket.io');

//App setup

let app = express();

let Server = app.listen(3000, (req, res) => {
  console.log("Server running on http://localhost:3000");
});

// Static file

app.use(express.static('public'));

// socket setup

let io = socket(Server);

io.on('connection',function (socket) {
  console.log("made socket connection", socket.id);
  
  socket.on('chat',function(data) {
    io.sockets.emit('chat',data);
  });
  socket.on('typing',(data) => {
    socket.broadcast.emit('typing',data);
  });
  
});

//Routes setup

app.get('/', (req, res) => {
  res.render(index);
});
