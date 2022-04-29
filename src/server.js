const app = require('./app/app')
const http = require('http')
const socket = require('socket.io')

const PORT = 3000

var server = http.createServer(app).listen(PORT, function(){
    console.log("Express server listening on port " + PORT)
})

const io = require('socket.io')(server);
const socketSever = require('./app/socketServer.js')
socketSever(io)

