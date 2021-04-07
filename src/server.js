const express = require("express");
const http = require('http');
const socketIO = require('socket.io');
const scheduler = require('node-schedule');


const app = express();
const port =3000;
const server=http.createServer(app);
const io=socketIO(server);
const riderNsp=io.of('/rider');
const driverNsp=io.of('/driver');

var riders=[];
var drivers=[];
var matchedPairs=[];

app.use(
    express.urlencoded({
      extended: true
    })
  );

app.use(express.json());

//Routes

app.get("/",(req,res)=>{

    res.send("HELLO").status(200);

});

// app.post('/todos', (req, res) => {
//     console.log(req.body.todo)
//   })

app.post("/rider",(req,res)=>{

    riders.push(req.body);
    //console.log(riders);

});

app.post("/driver",(req,res)=>{

    drivers.push(req.body);
    //console.log(drivers);

});

function pairMatch()
{
    var cost=0; 
    console.log(riders.length, drivers.length);
    if(riders.length !== 0)
    {
        for(var i=0; i<riders.length;i++)
    {
        var distance= Number.POSITIVE_INFINITY;
        var index=-1;

        if(drivers.length!==0)
        {
            
        for(var j =0;j<drivers.length;j++)
        {
            var tempDist = Math.sqrt(Math.pow((drivers[j].coOrdinate.x-riders[i].coOrdinate.x),2) + Math.pow((drivers[j].coOrdinate.y-riders[i].coOrdinate.y),2));
            
            if(tempDist<distance)
            {
                distance=tempDist;
                index=j;
            }

        }

        }
        cost=distance*2;
        
        var jsonMatch=
            {
                "riderName":riders[i].name,
                "driverName":drivers[index].name,
                "carNumber":drivers[index].carNumber,
                "fair":cost
            };
        
        
        matchedPairs.push(jsonMatch);
        
        
        //console.log(riders[i].name+"matched with"+drivers[index].name+"Cost is: "+cost);
        drivers.splice(index,1);
        riders.splice(i,1);
        

    }
    
    //drivers=[];
    //riders=[];

    }
    
console.log(matchedPairs);

};


setInterval(pairMatch,5000);

//var distance = Math.sqrt(Math.pow(drivers[i].coOrdinate.x-riders[i].coOrdinate.x),2 + Math.pow(drivers[i].coOrdinate.y-riders[i].coOrdinate.y),2)



riderNsp.on('connection',(socket)=>{

    console.log("Rider Connection Established");
    socket.emit('message',`Rider's Console: Hello`);
    if(matchedPairs.length!==0)
    {
        socket.emit("data","Hello Data")
    }
    socket.on("clientResponse",(response)=>{

        console.log(response);

    })

});

driverNsp.on('connection',(socket)=>{

    console.log("Driver Connection Established");
    socket.emit('message',`Driver's Console: Hello`);
    socket.on("clientResponse",(response)=>{

        console.log(response);

    })

});



server.listen(port,()=>{

    console.log(`Server started on port ${port}`);
});