$(document).ready(function(){
    board = Chessboard('chessBoard', boardConfig);
})

var board = null;
var chess = new Chess();

const boardConfig = {
    draggable: true,
    dropOffBoard: 'trash',
    onDragStart: onDragStart,
    onDrop: onDrop,
}
var isMachinePlayer = false;

function onDragStart (source, piece, position, orientation) {
}
 
function onDrop(source, target, piece, newPos, oldPos, orientation){
     
}