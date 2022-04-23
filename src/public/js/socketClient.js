function randomRoomId(){
    let roomId = '';
    let length = 12;
    let randomChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(counter = 0; counter < length; counter++){
        roomId += randomChar.charAt(Math.floor(Math.random() * randomChar.length));
    }

    return roomId;

}

$(function(){
    $(document).on('submit', '#createGameForm', function(event){
        var room = randomRoomId()
        var togglemode = ($('#togglemode').val() == 'on' ? 1 : 0)

        socket.emit('createGameForm', {
            socketid: room
        })

        $.post("/creategame", {socketid: room, public: togglemode})
    });
    $(document).on('submit', '#joinPrivateForm', function(event){
        socket.emit('joinPrivateGame', {
            room: $('#room').val()
        });
    });

    socket.on('userJoined', (userData) => {
        console.log(userData);
    });

    /*
    socket.on('opponentDisconnect',function(){
        $('.notification')
        .html('<div class="alert alert-success">Opponent left the room</div>');
        board.reset();
        chess.reset();
    })
    */
}(jQuery));