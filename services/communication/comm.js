const express = require("express");
const http = require('http');
const { resolve } = require("path");
const socketIO = require('socket.io');

const app=express();
const serverPort = 8080;
const socketPort = 8081;

const server=http.createServer();
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

    //console.log(req.body);
    matchedPair.push(req.body);

})

// const timeLapse = setTimeout(()=>{
//     return true;
// },8000)

commNsp.on('connection',(socket)=>{

    console.log("Rider Connection Established");
    socket.emit('message',`Hello Client`);

    setInterval(()=>{

        if(matchedPair.length!==0)
        {
            socket.emit('data',matchedPair)
            //matchedPair=[];

        }

    },1000)

    // const myPormise = new Promise((resolve,reject)=>
    // {
    //     if(timeLapse)
    //     {
    //         resolve("time Lapsed");
    //     }

    //     else{
    //         reject("Time's not lapsed");
    //     }

    // });

    // myPormise.then((data)=>{
    //     setInterval(()=>{

    //         if(matchedPair.length!==0)
    //         {
    //             socket.emit('data',matchedPair)
    //             //matchedPair=[];app
    
    //         }
    
    //     },1000)

    // }).catch((error)=>{
    //     console.log(error);
    // })
    
    
    // socket.on("clientResponse",(response)=>{

    //     console.log(response);

    // })

});

server.listen(socketPort,()=>{
    console.log("Comm Socket Service Started");
})

app.listen(serverPort,()=>{
    console.log("Communication Server Started");
})