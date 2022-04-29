const db = require('./database.js')



const users = []; // Serverseitiges Array, welches aktuelle online Spieler speichert
function randomRoomId() { // funktion um einen zufälligen raumnamen zu erstellen
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
        //   Sobald eine Socket Clientseitig initialisiert wird, wird dieses Code ausgeführt:


        //     ########## LOBBY ###############
        //          Lobby Funktionen

        socket.emit('lobbyrefresh', { //Schicke das Event "load_waiting_players" ans Frontend um die Lobby Liste zu laden
            users: users, //gebe die Liste der aktuell online und spielbereiten Spieler mit                   
        });



        socket.on('StartLobby', (requestData) => {  // Funktion um Client spielbereit zu machen (in die Lobby aufzunehmen)
            // Übergabeparameter beinhaltet aktuellen Usernamen und UserID
            let room = randomRoomId();
            let username = requestData.name;


            users.push({  // User in das globale Serverseite UserArray aufnehmen
                id: socket.id,
                name: username,
                room: room,
            });
            socket.join(room); //User Joint den Socker Raum
            console.log(users);

            socket.broadcast.emit("lobbyrefresh", { // Trigger das Refreshen der globalen Lobby 
                //socket.broadcast.emit sendet dieses Event an ALLE Teilnehmer die mit dem Socket/Server verbunden sind
                users: users //gebe die globale aktuelle online Teilnehmerliste mit 
            });

        });



        socket.on('sendJoinRequest', (requestData) => {
            socket.join(requestData.room) //Der Anfragende verbindet sich nun in den Socket/Raum
            console.log(users);

            let user = users.filter(user => user.id == socket.id)[0]; //hole die User der die Anfrag gesendet hat aus der List aller User
            user.room = requestData.room  // setze den room des users auf den, den er beigetreten ist
            socket.broadcast.to(requestData.room).emit('joinRequestRecieved', {
                //sendet die Info/EVENT, dass sich jemand mit der Lobby verbinden will als Broadcast in dem Raum
                //dieses EVENT landet zwagsläufig beim Herausforderer/Host
                // Anschließend werden noch infos mitgegeben wer die Anfrage gesendet hat:
                id: user.id,  
                name: user.name,
                room: user.room
            });
        });

        socket.on('acceptGameRequest', () => { // middleware funktion um event von Client --> Backend --> Andere Client zu senden
            // Spiel wird angenommen bereite die Farbauswahl vor in dem das gameRequestAccepted an den Host gesendet wird
            let user = users.filter(user => user.id == socket.id)[0];
            socket.broadcast.to(user.room).emit('gameRequestAccepted', {
                id: user.id,
                name: user.name,
                room: user.room,

            });

        });
        socket.on('setOrientation', (requestData) => { // middleware funktion um event von Client --> Backend --> Andere Client zu senden
            let user = users.filter(user => user.id == socket.id)[0];     //lese den akuellen User aus um mit seinen Daten       
            socket.broadcast.to(requestData.room).emit('setOrientationOppnt', { // dieses Event wir an die gegner Frontent Client gesendet
                color: requestData.color,  //hier ist die entgegengesetzte Farbe zum Host drine
                id: user.id,
                name: user.name,
                room: user.room,

            });
        });




        socket.on('gameISover', (userData) => {
            //das Spiel ist zuende und wir haben einen gewinner.
            // Mit dem Event getloser das in den Raum (ocket.broadcast.to(userData.room)) gesendet wird können wir den gegenspieler ausfindig machen 
            // dieser User im Raum ist automatisch der Verlieren
            socket.broadcast.to(userData.room).emit('getloser',
                {
                    //gehe zum Client der verloren hat und hole seine ID
                    won: userData.userWon,
                })
        });

        socket.on('calculateELO', (userData) => {
            //diese Funktion hat nun den gewinner und den Verlierer einer Schachpartie und kann somit die Elo bewertung in der DB durchführen
            console.log("Das Spiel ist aus. Gewonnen hat  " + userData.won)
            console.log("Das Spiel ist aus. Verloren hat  " + userData.lost)
            db.eloupdate(userData.won, userData.lost) //elo in der DB ändern
        });




        socket.on('chessMove', (requestData) => { // middleware funktion um gezogene Figure an den anderen Client zu senden.
            console.log(requestData);
            socket.broadcast.to(requestData.room).emit('oppntChessMove', { //sende den Zuginformationen an den Gegner mit dem Event  oppntChessMove
                color: requestData.color,
                from: requestData.from,
                to: requestData.to,
                piece: requestData.piece,
                promo: requestData.promo || ''

            });
        });


        socket.on('disconnect', () => { //Socket disconnect funktion
            //console.log("Someone disconnected")
            for (i = 0; i < users.length; i++) { //lösche alle infos über den User aus dem globalem user array
                if (users[i].id == socket.id) {
                    users.splice(i, 1);
                    break;
                }
            }
            //console.log(users)
            socket.broadcast.emit("lobbyrefresh", { // aktualisiere die Lobby
                users: users
            });

        });


    });// 
}
