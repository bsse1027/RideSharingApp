const io = require('socket.io-client');
const axios=require('axios');
//const mongodb=require("./mongodb.js")

const socket = io.connect('http://localhost:3002');

// const riderSocket = io("http://localhost:3000/rider");
// const driverSocket = io("http://localhost:3000/driver");
const commSocket = io("http://localhost:3002/communication");

var riderCount=0;
var driverCount=0;
var carNumber=10000;

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }





function riderRequest()
{

    riderCount++;
    var riderName= `Rider ${riderCount}`;
    var randomCoordX= between(0,1000);
    var randomCoordY= between(0,1000);
    var destCoordX= between(0,1000);
    var destCoordY= between(0,1000);

    axios
  .post('http://localhost:3001/rider', {
    "name":riderName,
    "coOrdinate":{
        "x":randomCoordX,
        "y":randomCoordY
    },
    "destination":{
        "x":destCoordX,
        "y":destCoordY
    }

  })
  .then(res => {
    // console.log(`statusCode: ${res.statusCode}`)
    // console.log(res)
  })
  .catch(error => {
    console.error(error)
  })

};

function driverRequest()
{
    driverCount++;
    carNumber++;
    var driverName= `Driver ${driverCount}`;

    var randomCoordX= between(0,1000);
    var randomCoordY= between(0,1000);

axios
  .post('http://localhost:3001/driver', {
    
    "name":driverName,
    "carNumber":carNumber,
    "coOrdinate":{
        "x":randomCoordX,
        "y":randomCoordY
    }

  })
  .then(res => {
    // console.log(`statusCode: ${res.statusCode}`)
    // console.log(res)
  })
  .catch(error => {
    console.error(error)
  })

};

setInterval(riderRequest,1000);
setInterval(driverRequest,1000);

commSocket.on("message",(msg)=>{
  console.log(msg);
})




// riderSocket.on("message",(msg)=>{

//     console.log(msg);
    
// });
var count=0;

commSocket.on("data",(arr)=>{

  var tempArr=arr;

  if(tempArr)
  {
    var rating =between(0,5);
    var driverName=tempArr[count].driverName;
    console.log(`${tempArr[count].riderName} has been connected with ${tempArr[count].driverName}.\nand the fair is: ${tempArr[count].fair} with a car number of ${tempArr[count].carNumber}\n The Rating is:${rating}`);
    
    axios
    .post('http://localhost:3003/rating', {
    "name":`${tempArr[count].driverName}`,
    "rating":rating

    })
    .then(res => {
    // console.log(`statusCode: ${res.statusCode}`)
    // console.log(res)
    })
    .catch(error => {
    console.error(error)
    })
 
  count++;
  
}
});



// driverSocket.on("message",(msg)=>{

//     console.log(msg);
// });



// socket.on('connect',()=>{

//     //socket.emit('clientResponse','hola');

// })
// ;


