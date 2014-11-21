var http=require('http').createServer(handler);
var io= require('socket.io')(http);

// start http server
http.listen(3333,function(){
    console.log("listen 3333");
});

// http handler
function handler(req,res){
    res.end("chat server");	//just response simple string
}

// socket.io connection handler
io.on("connection",function(socket){
    console.log("someone connect");	// heartbeat
    ////////////////////////////
    // properties by socket 
    var userName="nanashi";

    //////////////////////////////////////
    // set socket event handlers

    // start chatting
    socket.on("hello",function(user){
        userName=user;
        io.emit("message", "New user joined:" + user);
    });
    
    // nomal message
    socket.on("say",function(msg){
        console.log(msg);
        io.emit("message",userName + ":" + msg);
    });

});

