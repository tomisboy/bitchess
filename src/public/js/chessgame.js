var board = null;
var chess = new Chess();

const boardConfig = {
    draggable: true,
    dropOffBoard: 'trash',
    onDragStart: onDragStart,
    onDrop: onDrop,
}
var isMachinePlayer = false;

board = Chessboard('chessBoard', boardConfig);

function onDragStart (source, piece, position, orientation) {
    // 
   // console.log(chess.turn());
    if(chess.in_checkmate()){
        let confirm = window.confirm("You Lost! Reset the game?");
        let room = $('#onlinePlayers li.active button').data('room');
        if(confirm){
            if(isMachinePlayer){
                chess.reset();
                board.start();
            } else {

                //socket.requestNewGame();
                socket.emit('gameWon', { 
                    room: room,
                });
            }
        }
    }
    // do not pick up pieces if the game is over
    // or if it's not that side's turn
    if ( chess.game_over() || 
        (chess.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (chess.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false
    }
}

function onDrop(source, target, piece, newPos, oldPos, orientation){
    
    // see if the move is legal
    let turn = chess.turn();
    let room = $('#onlinePlayers li.active button').data('room');
    let move = chess.move({
        color: turn,
        from: source,
        to: target,
        
        //promotion: document.getElementById("promote").value
    });

    // illegal move
    if (move === null) return 'snapback';
    updateStatus();
    //player just end turn, CPU starts searching after a second
    if(isMachinePlayer){
        //window.setTimeout(chessEngine.prepareAiMove(),500);
    }
    else { 
        socket.emit('chessMove', { 
            room: room,
            color: turn, 
            from: move.from, 
            to: move.to,
            piece: move.piece
        });
    }

}

function updateStatus(){
    let status = "";
    let moveColor = "White";
    if(chess.turn()=='b'){   
        moveColor = "Black";
    }
    if(chess.in_checkmate()==true){
        status=  "You won, " + moveColor + " is in checkmate";
        window.alert(status);
        if(isMachinePlayer){
            chess.reset();
            board.start();
        }
        return; 
    } else if(chess.in_draw()){
        status = "Game Over, Drawn";
        window.alert(status);
        return;
    }
}

$(function(){
    
    $(document).on('click', '.setOrientation', function(){
        
        socket.emit('setOrientation', {
            room: $(this).data('room'),
            color: ($(this).data('color') === 'black') ? 'white': 'black'
        });
        
        board.orientation( $(this).data('color') );
        board.start();
        if($(this).data('color') == 'black'){
            $('.notification')
            .html('<div class="alert alert-success">Great ! Let\'s start game. You choose Black. Wait for White Move.</div>');
        }else{
            $('.notification')
            .html('<div class="alert alert-success">Great ! Let\'s start game. You choose White. Start with First Move.</div>');
        }
    });

    socket.on('setOrientationOppnt', (requestData) => {
        //console.log(requestData);
        board.orientation(requestData.color);
        board.start();
        $('#onlinePlayers li#'+requestData.id).addClass('active');
        if(requestData.color == 'white'){  
            $('.notification')
        .html('<div class="alert alert-success">Game is initialized by <strong>'+requestData.name+'</strong>. Let\'s start with First Move.</div>');
        } else{
            $('.notification')
        .html('<div class="alert alert-success">Game is initialized by <strong>'+requestData.name+'</strong>. Wait for White Move.</div>');
        }
        
    });

    socket.on('oppntChessMove', (requestData) => {
        console.log(requestData);
        let color = requestData.color;
        let source = requestData.from;
        let target = requestData.to;
        let promo = requestData.promo||'';


        chess.move({from:source,to:target,promotion:promo});
        board.position(chess.fen());
        //chess.move(target);
        //chess.setFenPosition();

    });

    socket.on('oppntWon', (requestData) => {
        $('.notification')
        .html('<div class="alert alert-success">You Won !!</div>');
        chess.reset();
        board.reset();
    });

});