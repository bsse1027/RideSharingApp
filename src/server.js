const express = require("express");
const http = require('http');
const socketIO = require('socket.io');
const scheduler = require('node-schedule');

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'ride-sharing';


const app = express();
const port =3000;
const server=http.createServer(app);
const io=socketIO(server);
const riderNsp=io.of('/rider');
const driverNsp=io.of('/driver');
const commNsp=io.of('/communication');

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

app.post("/rider",(req,res)=>{

    riders.push(req.body);
    //console.log(riders);
    res.send(req.body).status(200);

});

app.post("/driver",(req,res)=>{

    drivers.push(req.body);
    //console.log(drivers);
    res.send(req.body).status(200);

});

app.post("/rating",(req,res)=>{

    var driverName=req.body.name;
    var rating=req.body.rating;
    res.send(req.body).status(200);

    
    MongoClient.connect(connectionURL,{useUnifiedTopology: true}, (error, client) =>
    {
        if(error)
        {
            return console.log("Unable to connect to Database'");
        }

        const db = client.db(databaseName);

        
    db.collection('drivers').insertOne(
      {
          name: driverName,
          rating : rating
      }
      , (error , result) => {

          if(error)
          {
              console.log("Data insertion failed");
          
          }

          console.log(result.ops);


      }
  )

    }

    )

  })

function pairMatch()
{
    var cost=0; 
    //console.log(riders.length, drivers.length);
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

    }
    



};


setInterval(pairMatch,5000);


commNsp.on('connection',(socket)=>{

    console.log("Rider Connection Established");
    socket.emit('message',`Hello Client`);
    setInterval(()=>{

        if(matchedPairs.length!=0)
        {
            socket.emit('data',matchedPairs)
        }

    },5000)
    
    // socket.on("clientResponse",(response)=>{

    //     console.log(response);

    // })

});



server.listen(port,()=>{

    console.log(`Server started on port ${port}`);
});