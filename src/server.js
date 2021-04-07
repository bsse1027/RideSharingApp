const express = require("express");
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const port =3000;
const server=http.createServer(app);
const io=socketIO(server);

app.get("/",(req,res)=>{

    res.send("HELLO").status(200);
    
});

app.get("/rider",(req,res)=>{

    res.send("HELLO").status(200);

});

app.get("/driver",(req,res)=>{

    res.send("HELLO").status(200);

});



io.on('connection',(socket)=>{

    console.log("Client Connection Established");
    socket.emit('message','Hello Client');
    socket.on("clientResponse",(response)=>{

        console.log(response);

    })

});



server.listen(port,()=>{

    console.log(`Server started on port ${port}`);
});