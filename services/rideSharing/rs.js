const express = require("express");
const axios = require("axios");

const app=express();
const port = 3001;

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

app.post("/rs/rider",(req,res)=>{

    riders.push(req.body);
    //console.log(riders);
    res.send(req.body).status(200);

});

app.post("/rs/driver",(req,res)=>{

    drivers.push(req.body);
    //console.log(drivers);
    res.send(req.body).status(200);

});

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

            axios.post('http://localhost/mp',
            
                jsonMatch
                
                ).then(res => {
                // console.log(`statusCode: ${res.statusCode}`)
                // console.log(res)
                })
                .catch(error => {
                console.error(error)
                }) 
                
            drivers.splice(index,1);
            riders.splice(i,1);
        
        
        //matchedPairs.push(jsonMatch);
        
    };
        
        
        
        
        //console.log(riders[i].name+"matched with"+drivers[index].name+"Cost is: "+cost);
        

    }

    // console.log(matchedPairs);

    

};   


setInterval(pairMatch,5000);

app.listen(port,()=>{
    console.log("RideSharing Service has been started.");
})