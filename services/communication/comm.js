const express = require("express");
const http = require('http');
const socketIO = require('socket.io');

const app=express();
const port = 3002;

const server=http.createServer(app);
const io=socketIO(server);
// const riderNsp=io.of('/rider');
// const driverNsp=io.of('/driver');
const commNsp=io.of('/communication');



app.use(
    express.urlencoded({
      extended: true
    })
  );

app.use(express.json());

var matchedPair=[];

app.post("/mp",(req,res)=>{

    matchedPair.push(req.body);

})

commNsp.on('connection',(socket)=>{

    console.log("Rider Connection Established");
    socket.emit('message',`Hello Client`);
    setInterval(()=>{

        if(matchedPair.length!==0)
        {
            socket.emit('data',matchedPair)
        }

    },5000)
    
    // socket.on("clientResponse",(response)=>{

    //     console.log(response);

    // })

});

server.listen(port,()=>{
    console.log("Communication Service Started");
})