const express = require('express'); 
const app = express();
const path = require('path');
const http = require('http'); // socket-io runs on http that's why it is required
const socketio = require('socket.io'); // accquiring socket-io here
const server = http.createServer(app); // here we are creating the http server
const io = socketio(server); 

app.set('view engine','ejs');
app.use(express.static('public'));

io.on("connection",function(socket){
    
    socket.on("send-location",function(data){
        io.emit("receive-location",{ id : socket.id , ...data});

        socket.on("disconnect",function(){

            io.emit("user-disconnected!!",socket.id);
        });
    });

    console.log("connected!!");
});

app.get('/',function(req,res){
    res.render("index");
})

server.listen(3000); 