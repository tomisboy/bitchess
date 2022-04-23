const db = require('./database.js')

exports = module.exports = function(io){

    io.on('connection', (socket) => {
        socket.on('createGameForm', (formData) => { 
            let socketid = formData.socketid         
            console.log(socketid)
            socket.join(socketid);         
        });

        socket.on('joinPrivateGame', (requestData) => {
            socket.join(requestData.room)
            socket.emit('testMessage')
        });
        /*
        
        socket.on('chessMove', (requestData) => {
            console.log(requestData);
            socket.broadcast.to(requestData.room).emit('oppntChessMove',{
                color: requestData.color,
                from: requestData.from,
                to: requestData.to,
                piece: requestData.piece,
                promo: requestData.promo||''

            });
        });

        socket.on('gameWon', (requestData) => {
            socket.broadcast.to(requestData.room).emit('oppntWon');
        });
        */     
    });
}