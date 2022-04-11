const app = require('./app/app')
const http = require('http').createServer(app);
const socketSever = require('./app/socketServer.js')
const io = require('socket.io')(http)

socketSever(io)
const PORT = process.env.PORT || 443;

http.listen(PORT, () => {
    console.log('Current server runing on PORT : '+ PORT);
});