const express = require("express");
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const port =3000;
const server=http.createServer(app);
const io=socketIO(server);
const riderNsp=io.of('/rider');
const driverNsp=io.of('/driver');
app.use(
    express.urlencoded({
      extended: true
    })
  );

app.use(express.json());

app.get("/",(req,res)=>{

    res.send("HELLO").status(200);

});

app.post('/todos', (req, res) => {
    console.log(req.body.todo)
  })

// app.get("/rider",(req,res)=>{

//     res.send("HELLO").status(200);

// });

// app.get("/driver",(req,res)=>{

//     res.send("HELLO").status(200);

// });



riderNsp.on('connection',(socket)=>{

    console.log("Rider Connection Established");
    socket.emit('message','Hello Rider');
    socket.on("clientResponse",(response)=>{

        console.log(response);

    })

});

driverNsp.on('connection',(socket)=>{

    console.log("Driver Connection Established");
    socket.emit('message','Hello Driver');
    socket.on("clientResponse",(response)=>{

        console.log(response);

    })

});



server.listen(port,()=>{

    console.log(`Server started on port ${port}`);
});