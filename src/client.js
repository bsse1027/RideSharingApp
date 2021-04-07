const io = require('socket.io-client');
const axios=require('axios');

const socket = io.connect('http://localhost:3000');


socket.on("message",(msg)=>{

    console.log(msg);
})

socket.on('connect',()=>{

    socket.emit('clientResponse',);

})
;


