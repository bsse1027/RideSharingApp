const express = require("express");

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb://192.168.0.107:27017';
const databaseName = 'ride-sharing';

const app=express();
const port = 3003;

app.use(
    express.urlencoded({
      extended: true
    })
  );

app.use(express.json());

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

app.listen(port,()=>{
    console.log("Rating service is up");
})