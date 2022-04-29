var board = null;
var chess = new Chess();
var currentRoom
var gameover = 0
var winningcolor
var currentuser = $('#userid').html() //lese den aktuellen User aus dem html element 
const boardConfig = {
    draggable: true,
    dropOffBoard: 'snapback',
    showNotation: true,
    onDragStart: onDragStart,
    onDrop: onDrop,
}
var isMachinePlayer = false;

board = Chessboard('chessBoard', boardConfig);

function onDragStart(source, piece, position, orientation) {
// funktion wird aufgerufen wenn eine Figur berührt wird (angeklickt)
    if (gameover < 1) { //überprüfe ob das Spiel vorbei ist
        if (chess.in_checkmate()) {
            let confirm = window.confirm("Du befindest dich in Schachmatt und hast somit Verloren");
            $('.notification')
                    .html('<div class="alert alert-success">"Spielende du hast leider Verloren."</div>');
            gameover = 1
            if (confirm) {
                if (isMachinePlayer) {
                    chess.reset();
                    board.start();
                } else {

                }
            }
        }
        // do not pick up pieces if the game is over
        // or if it's not that side's turn
        if (chess.game_over() ||
            (chess.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (chess.turn() === 'b' && piece.search(/^w/) !== -1)) {
            return false
        }
    }
    else {
        window.alert("gameover");
    }

}
function onDrop(source, target, piece, newPos, oldPos, orientation) {
//Funktion wird ausgewählt wenn Figur letztendlich losgelassen wurd und der Zug somit bestätigt wurde
    if (gameover < 1) {
        let turn = chess.turn(); //überprüfe auf valieden Zug
        let move = chess.move({ //speichere den Move in das Elemet move
            color: turn,
            from: source,
            to: target,

            //promotion: document.getElementById("promote").value
        });

        // illegal move
        if (move === null) return 'snapback';
        updateStatus();
        
        if (isMachinePlayer) {
            //window.setTimeout(chessEngine.prepareAiMove(),500);
        }
        else { // Zug war auf der Clientseit gültig bishier hier, und wird somit 
            socket.emit('chessMove', {
                room: currentRoom, //welcher raum ist dran
                color: turn, //welche farbe ist am ZUg
                from: move.from,
                to: move.to,
                piece: move.piece
            });
        }

    } else {
        window.alert("gameover"); //spiel ist vorbei es kommt eine meldung 
    }
}

function updateStatus() {
    let status = "";
    let moveColor = "White";
    if (chess.turn() == 'b') {
        moveColor = "Black";
    }
    if (chess.in_checkmate() == true) {
        status = "You won, " + moveColor + " is in checkmate";
        gameover = 1;
        winningcolor = (moveColor === 'Black') ? 'weiß' : 'schwarz'
        $('.notification')
        .html('<div class="alert alert-success">"Spielende --> ' + winningcolor + ' <-- hat gewonnen."</div>');


        // Wenn Spiel zu ende Send das Spiel ist vorbei Event an das Backend.
        socket.emit('gameISover', {
            userWon: currentuser, //Schreibe die info WER (aktueller Client) gewonnen hat
            room: currentRoom  //welcher raum ist zu ende
        });
        window.alert(status);
        if (isMachinePlayer) {
            chess.reset();
            board.start();
        }
        return;
    } else if (chess.in_draw()) {
        status = "Game Over, Drawn";
        window.alert(status);
        gameover = 1;
        return;
    }
}







$(function () {

    socket.on('oppntChessMove', (requestData) => {// wenn dieses Event empfangen wird hat dein gegner ein ZUg gemacht
        //dieses Event schreibt den Gegnerichen Zug in dein Schachfeld
        console.log("oppntChessMove")
        console.log(requestData);
        let color = requestData.color;
        let source = requestData.from;
        let target = requestData.to;
        let promo = requestData.promo || '';

        chess.move({ from: source, to: target, promotion: promo }); // hier wird die figur bewegt 
        board.position(chess.fen());
        //chess.move(target);
        //chess.setFenPosition();

    });



    $(document).on('click', '.setOrientation', function () {
        currentRoom = $(this).data('room') //lese den aktuellen Raum aus dem HTML Element des Knopfes
        socket.emit('setOrientation', {
            room: $(this).data('room'), //hole room aus den Botton html tag 

            color: ($(this).data('color') === 'black') ? 'white' : 'black', // hier wird jenachdem welche Color gewählt wurde diese für den gegener geswitsched
            userid: $('#userid').html(), //lese die aktuelle UserID aus
        });

        board.orientation($(this).data('color'));  //starte das Schachfeld auf der Hostseite mit der ausgewählten Farbe
        board.start();
        if ($(this).data('color') == 'black') {
            $('.notification')
                .html('<div class="alert alert-success">Great ! Starten wir das Spiel. Sie wählen Schwarz. Warte auf den weißen Zug.</div>');
        } else {
            $('.notification')
                .html('<div class="alert alert-success">Great ! Starten wir das Spiel. Sie wählen Weiß. Beginne mit dem ersten Zug.</div>');
        }
    });
    socket.on('setOrientationOppnt', (requestData) => {
        //Dieses Event bekommt der gegner (des Host)
        //Diesem wird gesagt wie er Sein Schachboard darzustellen hat 
        currentRoom = requestData.room //lese den aktuellen Raum aus dem HTML Element des Knopfes

        board.orientation(requestData.color);
        board.start();

        if (requestData.color == 'white') {
            $('.notification')
                .html('<div class="alert alert-success">Das Spiel wird initialisiert durch <strong>' + requestData.name + '</strong>.  Beginne mit dem ersten Zug </div>');
        } else {
            $('.notification')
                .html('<div class="alert alert-success">Das Spiel wird initialisiert durch  <strong>' + requestData.name + '</strong>.  Beginne mit dem ersten Zug </div>');
        }
        //Gameinitialisierung ist hierbmit beendet
    });



});
