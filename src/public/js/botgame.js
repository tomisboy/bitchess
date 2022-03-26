var board = null;

$(document).ready(function(){
    board = Chessboard('chessBoard', boardConfig);

})

var gameid = 1;
var moves = "";
var chess = new Chess();

const boardConfig = {
    draggable: true,
    dropOffBoard: 'snapback',
    sparePieces: true,
    position: 'start',
    showNotation: true,
    onDragStart: onDragStart,
    onDrop: onDrop
}

var isMachinePlayer = false;

function onDragStart(source, piece, position, orientation) {
}
 
function onDrop (source, target, piece, newPos, oldPos, orientation){
    var message = {'gameid' : gameid, 'board' : Chessboard.objToFen(newPos), 'moves' : moves };
    $.post("/updatebotgame", message)
}