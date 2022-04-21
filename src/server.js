const app = require('./app/app')
const http = require('http')
const socket = require('socket.io')

const PORT = process.env.PORT || 443

var server = http.createServer(app).listen(PORT, function(){
    console.log("Express server listening on port " + PORT);
})

var io = socket(server);
io.sockets.on('connection', function () {
    console.log('hello world im a hot socket');
})