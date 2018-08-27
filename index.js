let express = require('express');
let socket = require('socket.io');
let url = require('url');

//App setup

let app = express();
let port = process.env.port || 5000;

let Server = app.listen(port, (req, res) => {
  console.log("Server running on http://localhost:5000");
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
  const path = url.parse(req.url).pathname.slice(1).replace(/%20/g, ' ')
    
    res.writeHead(200, {'Content-Type': 'application/json'})    
    res.write(index);
    res.end();
});
