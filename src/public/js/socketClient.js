// $.post("/creategame", {socketid: room, public: togglemode})

$(function () {

    $(document).ready(function () {
        socket.emit('StartLobby', //Wenn die Seite komplett geladen wird, 
            // dann wird ein StartLobby Event an das Socket Backend gesendet.
            // Dieses triggert den Start der Socketverbindung
            {
                name: $('#username').html(), // Zusätzlich wird der aktuelle Username übergeben 
            });

        //$.post("/creategame", {socketid: room, public: togglemode})
    });


    socket.on('lobbyrefresh', (roomData) => { // Funktion um Lobbyliste in Echtzeit zuaktualisieren
        //console.log("Lobby refrehed")
        $('#onlinePlayers').empty() //Leere zunächste die ganze Liste
        roomData.users.forEach(user => { // gehe jeden User in der Liste durch
            $('#onlinePlayers') // füge einen Knopf mit den Infos über den Raum, den Namen und die Socket iD hinzu
                .append($('<li class="list-group-item" id="' + user.id + '">')
                    .html('<button type="button" data-room="' + user.room + '" class="btn btn-primary btn-sm joinGameRequest">' + user.name + '</button>'));
        });
        if (document.getElementById(socket.id)) { // Lösche eigene Lobbys (sodass diesen nicht selbst beigetreten werden kann)
            $(document.getElementById(socket.id)).hide()
        }
    });

    $(document).on('click', '.joinGameRequest', function () { //Funktion um einer Lobby/Raum beizutreten

        socket.emit('sendJoinRequest', { // Durch das drücken des HTML elements wird das "sendJoinRequest" ans Backend gesendet
            room: $(this).data('room'), // zusätzlich wird sendJoinRequest noch der Raum mitgegeben welcher sich im HTML_button Element verbirgt

        });
        $('.notification').html('<div class="alert alert-success">Spielanfrage wurde gesendet.</div>');
    });


    socket.on('joinRequestRecieved', (userData) => {
        // Die Angefragt wird darüber informiert, dass jemand joinen will
        // Er wird ein Annehmen button(acceptGameRequest) erstellt hinter dem die aktuelle Raumnummer hinterlegt ist.
        $('.notification')
            .html('<div class="alert alert-success">Sie haben eine Spielanfrage erhalten von <strong>' + userData.name + '</strong>. <button data-room="' + userData.room + '" class="btn btn-primary btn-sm acceptGameRequest">Annehmen ! </button></div>')
    });


    $(document).on('click', '.acceptGameRequest', function () { 
        //funkion wird aufgerufen wenn auf den Annehmen button(acceptGameRequest) gedrückt wird 
        socket.emit('acceptGameRequest', {
        });

        $('#onlinePlayers').hide(); // blende die Lobby auf der Seite des Anfragenden aus
        $('.notification')
            .html('<div class="alert alert-success">Bitte warten Sie auf die Spielinitialisierung vom Host.</div>');
    });

    socket.on('gameRequestAccepted', (userData) => {

        //ab hier ist die Spielanfrage angenommen und der Host wird entscheiden welche Farbe er spielen wird
        //dazu werden zwei Knöpfe erstellt die die auswahl der Farbe angeben.
        // weiter geht es anschließend in der chessgame.js
        $('.notification')
            .html('<div class="alert alert-success">Spielanfrage angenommen von <strong>' + userData.name + '</strong>.</div>');
        $('.notification')
            .append($('<div class="text-center">'))
            .append('Choose rotation. <button data-room="' + userData.room + '" data-color="black" type="button" class="btn btn-primary btn-sm setOrientation">Black</button> or <button data-room="' + userData.room + '" data-color="white" type="button" class="btn btn-primary btn-sm setOrientation">White</button>');
        $('#onlinePlayers').hide(); // blende die Lobby auf der Seite des Hosts aus
    });




    socket.on('getloser', (userData) => {
        //diese nachricht bekommt der verlierer
        let currentLOSTuser = $('#userid').html() //Schreibe die ID des USerer der Verloren hat
        //console.log("ich hab verloren")
        socket.emit('calculateELO', { //berechne die ELO Wertung
            lost: currentLOSTuser,
            won: userData.won
        });

    });


}(jQuery));