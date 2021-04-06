const express = require("express");
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;
const server=http.createServer(app);
const io=socketIO(server);