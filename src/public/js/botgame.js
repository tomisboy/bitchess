var board = null;

$(document).ready(function (){
    $.post("/getbotgame", function(data){
        setGame(data)
    })
})

var gameid = null;
var playerid = null;
var moves = "";

const boardConfig = {
    draggable: true,
    dropOffBoard: 'snapback',
    sparePieces: false,
    position: 'start',
    showNotation: true,
    onDragStart: onDragStart,
    onDrop: onDrop
}

var isMachinePlayer = false;

function onDragStart(source, piece, position, orientation) {
}
 
function onDrop (source, target, piece, newPos, oldPos, orientation){
    var message = {'gameid' : gameid, 'board' : Chessboard.objToFen(newPos), 'moves' : moves }
    $.post("/updatebotgame", message)
}

function setGame(game){
    console.log(game)

    boardConfig.position = game.board
    gameid = game.id
    playerid = game.playerid

    board = Chessboard('chessBoard', boardConfig);
}