//Make a connection

let socket = io.connect('http://localhost:5000');

// Query DOM

let message = document.getElementById('message');
    user = document.getElementById('user'),
    output = document.getElementById('output'),
    send = document.getElementById('send'),
    feelback = document.getElementById('feelback');
    
//Emit Events

send.addEventListener("click",function() {
  
  socket.emit('chat',{
    
    user : user.value, 
    message : message.value
    
  });
  
});     

message.addEventListener("keypress", function() {
  
  socket.emit('typing', user.value);
  
});

//Listen for Events

socket.on('chat',function (data) {
  output.innerHTML += '<p><strong>' +data.user +' :</strong> '+data.message; + '</p>'
  
});

socket.on('typing', function(data){
  feelback.innerHTML = '<p><em>' +data+' is typing a message...</em></p>'
})

