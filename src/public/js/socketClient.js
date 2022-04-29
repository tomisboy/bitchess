// $.post("/creategame", {socketid: room, public: togglemode})

$(function () {

    $(document).ready(function () {
        console.log("ready!")
        $('#onlinePlayers').hide();
    });





    $(document).on('submit', '#StartLobby', function (event) {
        event.preventDefault();
        socket.emit('StartLobby',
            {
                name: $('#username').html(),
                userid: $('#userid').html(),
            });

        $('#StartLobby').hide();
        $('#onlinePlayers').show();
        //console.log($('#username').html())
        //$.post("/creategame", {socketid: room, public: togglemode})
    });


    socket.on('roomDetail', (roomData) => {
        //console.log("roomde")
        $('#onlinePlayers').empty()
        roomData.users.forEach(user => {
            $('#onlinePlayers')
                .append($('<li class="list-group-item" id="' + user.id + '">')
                    .html('<button type="button" data-room="' + user.room + '" class="btn btn-primary btn-sm joinGameRequest">' + user.name + '</button>'));
        });
        //console.log(document.getElementById(socket.id))
        if (document.getElementById(socket.id)) {
            //console.log("ja" + document.getElementById(socket.id))
            $(document.getElementById(socket.id)).hide()
        }
    });

    socket.on('existingUsers', (userData) => {
        console.log("exitingusers")
        currentuser = $('#userid').html()
        userData.users.forEach(user => {
            $('#onlinePlayers')
                .append($('<li class="list-group-item" id="' + user.id + '">')
                    .html('<button type="button" data-room="' + user.room + '" class="btn btn-primary btn-sm joinGameRequest">' + user.name + '</button>'));
        });
    });

    $(document).on('click', '.joinGameRequest', function () {
        socket.emit('sendJoinRequest', {
            room: $(this).data('room'),

        });
        $('.notification').html('<div class="alert alert-success">Game request sent.</div>');
    });

    socket.on('joinRequestRecieved', (userData) => {
        //console.log(userData);
        $('.notification')
            .html('<div class="alert alert-success">Recieved a game request from <strong>' + userData.name + '</strong>. <button data-room="' + userData.room + '" class="btn btn-primary btn-sm acceptGameRequest">Accept</button></div>')
    });


    $(document).on('click', '.acceptGameRequest', function () {
        currentRoom = $(this).data('room')
        socket.emit('acceptGameRequest', {
            room: $(this).data('room')
        });
        console.log($(this).data('room') + "+Raumnummer von angenommenem Spiel")
        //$('#onlinePlayers').hide();

        $('.notification')
            .html('<div class="alert alert-success">Please wait for game initialize from host.</div>');
    });

    socket.on('gameRequestAccepted', (userData) => {
        //console.log(userData);
        $('.notification')
            .html('<div class="alert alert-success">Game request accepted from <strong>' + userData.name + '</strong>.</div>');
        $('.notification')
            .append($('<div class="text-center">'))
            .append('Choose rotation. <button data-room="' + userData.room + '" data-color="black" type="button" class="btn btn-primary btn-sm setOrientation">Black</button> or <button data-room="' + userData.room + '" data-color="white" type="button" class="btn btn-primary btn-sm setOrientation">White</button>');

        $('#onlinePlayers li#' + userData.id).addClass('active');
        $('#onlinePlayers').hide();
    });

    socket.on('getloser', (userData) => {
        //diese nachricht bekommt der verlierer
        let currentLOSTuser = $('#userid').html()
        //console.log("ich hab verloren")
        socket.emit('calculateELO', {
            lost: currentLOSTuser,
            won: userData.won
        });

    });





    // $(document).on('click', '.joinGame', function () {
    //     board.start(),
    //     socket.emit('triggerStart',
    //         {room: $(this).data('room')
    //         })


    // }
    // )






    /*
    socket.on('opponentDisconnect',function(){
        $('.notification')
        .html('<div class="alert alert-success">Opponent left the room</div>');
        board.reset();
        chess.reset();
    })
    */
}(jQuery));