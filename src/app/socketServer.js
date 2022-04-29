const db = require('./database.js')



const users = [];
function randomRoomId() {
    let roomId = '';
    let length = 4;
    let randomChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (counter = 0; counter < length; counter++) {
        roomId += randomChar.charAt(Math.floor(Math.random() * randomChar.length));
    }

    return roomId;

}


exports = module.exports = function (io) {

    io.on('connection', (socket) => {

        socket.on('StartLobby', (requestData) => {
            //console.log(requestData)

            let room = randomRoomId();
            let lobbyname = requestData.name;

            users.push({
                id: socket.id,
                name: lobbyname,
                room: room
            });
            socket.join(room);
            console.log(users);

            socket.broadcast.emit("roomDetail", {
                users: users,


            });

        });

        socket.emit('existingUsers', {
            users: users,
            currentUserId: socket.id
        });

        socket.on('triggerStart', (requestData) => {
            let user = users.filter(user => user.id == socket.id)[0];
            socket.broadcast.to(requestData.room).emit('startgame', {
                id: user.id,
                name: user.name,
                room: user.room
            })
        });


        socket.on('sendJoinRequest', (requestData) => {
            //console.log(requestData.room);
            let user = users.filter(user => user.id == socket.id)[0];
            console.log("list rooms and participants")


            console.log(users)
            console.log(user.name)
            console.log("from room" + user.room)
            console.log("send JoinRequest... to room ")
            console.log(requestData.room)
            socket.join(requestData.room)
            user.room = requestData.room 
            console.log("trete raum bei")
            console.log("Zeige aktuellen raum")
            console.log(users)


            socket.broadcast.to(requestData.room).emit('joinRequestRecieved', {
                id: user.id,
                name: user.name,
                room: user.room
            });
        });

        socket.on('acceptGameRequest', (requestData) => {
            let user = users.filter(user => user.id == socket.id)[0];

            socket.broadcast.to(requestData.room).emit('gameRequestAccepted', {
                id: user.id,
                name: user.name,
                room: user.room,

            });

        });
        socket.on('setOrientation', (requestData) => {
            let user = users.filter(user => user.id == socket.id)[0];
            socket.broadcast.to(requestData.room).emit('setOrientationOppnt', {
                color: requestData.color,
                id: user.id,
                name: user.name,
                room: user.room,
            });
        });






        socket.on('chessMove', (requestData) => {
            console.log(requestData);
            socket.broadcast.to(requestData.room).emit('oppntChessMove', {
                color: requestData.color,
                from: requestData.from,
                to: requestData.to,
                piece: requestData.piece,
                promo: requestData.promo || ''

            });
        });














        socket.on('disconnect', () => {
            for (i = 0; i < users.length; i++) {
                if (users[i].id == socket.id) {
                    users.splice(i, 1);
                    break;
                }
            }
        });
    });
}
