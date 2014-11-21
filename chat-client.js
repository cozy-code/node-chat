var client=require('socket.io-client')("http://localhost:3333");
// param
var userName=process.argv[2];
if( !userName ){
    userName="Nanashi";
}

// create user interface
var ui= require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});
ui.setPrompt(">>");
ui.prompt();

ui.on('line',function(line){
    //console.log(line);
    //send message
    client.emit("say",line.toString());
    ui.prompt();
});

ui.on('close',function(){
    console.log("bye!");
    process.exit(0);
});

// start chatting
client.emit("hello",userName);

// wait message
client.on("message",function(message){
    console.log(message.toString());
    ui.prompt();
});

