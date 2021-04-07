const io = require('socket.io-client');
const axios=require('axios');

const socket = io.connect('http://localhost:3000');

const riderSocket = io("http://localhost:3000/rider");
const driverSocket = io("http://localhost:3000/driver");



function riderRequest()
{
axios
  .post('http://localhost:3000/rider', {
    todo: 'Rider'
  })
  .then(res => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(res)
  })
  .catch(error => {
    console.error(error)
  })

};

function driverRequest()
{
axios
  .post('http://localhost:3000/driver', {
    todo: 'Driver'
  })
  .then(res => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(res)
  })
  .catch(error => {
    console.error(error)
  })

};

setInterval(riderRequest,1000);
setInterval(driverRequest,1000);




riderSocket.on("message",(msg)=>{

    console.log(msg);
});

driverSocket.on("message",(msg)=>{

    console.log(msg);
});



// socket.on('connect',()=>{

//     //socket.emit('clientResponse','hola');

// })
// ;


