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
}
 
function onDrop(source, target, piece, newPos, oldPos, orientation){
     
}