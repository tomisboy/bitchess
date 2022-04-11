const users = [];
function randomRoomId(){
    let roomId = '';
    let length = 12;
    let randomChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(counter = 0; counter < length; counter++){
        roomId += randomChar.charAt(Math.floor(Math.random() * randomChar.length));
    }

    return roomId;

}
exports = module.exports = function(io){

    io.on('connection', (socket) => {
        socket.on('submitName', (formData) => {

            let userName = formData.name;
            let room = randomRoomId();

            users.push({
                id: socket.id,
                name: userName,
                room: room
            });

           // console.log(users);

            socket.join(room);
            socket.broadcast.emit("roomDetail", {
                users: users,
            });

        });

        socket.emit('existingUsers', {
            users:users,
            currentUserId: socket.id
        });

        socket.on('sendJoinRequest', (requestData) => {
            //console.log(requestData.room);
            let user = users.filter(user=>user.id == socket.id)[0];
            socket.broadcast.to(requestData.room).emit('joinRequestRecieved', {
                id: user.id,
                name: user.name,
                room: user.room
            });
        });

        socket.on('acceptGameRequest', (requestData) => {
            let user = users.filter(user=>user.id == socket.id)[0];
           
            socket.broadcast.to(requestData.room).emit('gameRequestAccepted', {
                id: user.id,
                name: user.name,
                room: user.room,
                
            });
            
        });

        socket.on('setOrientation', (requestData) => {
            let user = users.filter(user=>user.id == socket.id)[0];
            socket.broadcast.to(requestData.room).emit('setOrientationOppnt', {
                color: requestData.color,
                id: user.id,
                name: user.name,
                room: user.room,
            });
        });

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
        
        socket.on('disconnect', () => {
            for(i = 0; i< users.length; i++){
                if(users[i].id == socket.id){
                    users.splice(i,1);
                    break;
                }
            }
        });
    });

}