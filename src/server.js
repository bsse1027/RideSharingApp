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

// function pairMatch()
// {
    
//     for(var i=0; i<riders.length;i++)
//     {
//         var distance= Number.POSITIVE_INFINITY;
//         var index;
        
//         for(var j =0;j<drivers.length;j++)
//         {
//             var tempDist = Math.sqrt(Math.pow((drivers[j].coOrdinate.x-riders[i].coOrdinate.x),2) + Math.pow((drivers[j].coOrdinate.y-riders[i].coOrdinate.y),2));
            
//             if(tempDist<distance)
//             {
//                 distance=tempDist;
//                 index=j;
//             }

//         }

//         drivers.splice(index,1);
//         riders.splice(i,1);
//         console.log(riders[i].name+"matched with"+drivers[index].name);

//     }
//     drivers=[];
//     riders=[];


// };

//setInterval(pairMatch,5000);

//var distance = Math.sqrt(Math.pow(drivers[i].coOrdinate.x-riders[i].coOrdinate.x),2 + Math.pow(drivers[i].coOrdinate.y-riders[i].coOrdinate.y),2)

const job = scheduler.scheduleJob('*/5 * * * * *', function()
{

    var distance= Number.POSITIVE_INFINITY;
    var riderIndex=-1;
    

    riders.forEach((riderData)=>{
        var cost;
        var minDriverIndex;

        riderIndex++;

        var driverIndex=-1;

        if(drivers.length)
        {
            drivers.forEach((driverData)=>{

                driverIndex++;
                var tempDist = Math.sqrt(Math.pow((drivers[driverIndex].coOrdinate.x-riders[riderIndex].coOrdinate.x),2) + Math.pow((drivers[driverIndex].coOrdinate.y-riders[riderIndex].coOrdinate.y),2));

                if(tempDist<distance)
                {
                    distance=tempDist;
                    minDriverIndex=driverIndex;
                }

                cost = 2*distance;
                

            });
        }

        console.log(riderData.name + drivers[minDriverIndex].name);


    })

});



riderNsp.on('connection',(socket)=>{

    console.log("Rider Connection Established");
    socket.emit('message',`Rider's Console: Hello`);
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