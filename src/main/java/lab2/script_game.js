var yellowCheker = "https://upload.wikimedia.org/wikipedia/commons/8/82/Circle-yellow.svg";
var whiteCheker = "https://upload.wikimedia.org/wikipedia/commons/5/58/White_Circle.svg";
var blackCheker = "https://www.flaticon.com/svg/static/icons/svg/36/36834.svg";

var whiteKing = "https://www.flaticon.com/svg/static/icons/svg/606/606032.svg";
var blackKing = "https://www.flaticon.com/svg/static/icons/svg/606/606114.svg";
var yellowKing = "https://www.flaticon.com/svg/static/icons/svg/864/864640.svg";

var isCheked = false;

let characters = ["A", "B", "C", "D", "E", "F", "G", "H"]
let boardBegin = [
	["", "b1", "", "b2", "", "b3", "", "b4"],
	["b5", "", "b6", "", "b7", "", "b8", ""],
	["", "b9", "", "b10", "", "b11", "", "b12"],
	["", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", ""],
	["w12", "", "w11", "", "w10", "", "w9", ""],
	["", "w8", "", "w7", "", "w6", "", "w5"],
	["w4", "", "w3", "", "w2", "", "w1", ""]
];



var map = new Map();

let board = boardBegin;

function begin() {
clearCurrentBoard();
copyElem(boardBegin);
}

function example1() {
clearCurrentBoard();
var queen = map.get(boardExample[7][2]);
queen.src = blackKing;
copyElem(boardExample);
}

function clearCurrentBoard() {
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board.length; j++) {
			if (board[i][j] != "") {
				var id = characters[j] + (board.length - i);
				var elem = document.getElementById(id);
				var img = document.getElementById(board[i][j]);
				map.set(board[i][j], img);
				if (board[i][j][0] == 'b') {
					img.src = blackCheker;	
				} else {
					img.src = whiteCheker;
				}
 				elem.removeChild(img);
			}
		}
	}
clearFields();
isCheked = false;
}

function copyElem(array) {
board = array;
for (let i = 0; i < board.length; i++) {
	for (let j = 0; j < board.length; j++) {
			if (board[i][j] != "") {
				var id = characters[j] + (board.length - i);
				var elem = document.getElementById(id);
				var img = map.get(board[i][j]);
				map.delete(board[i][j]);
 				elem.appendChild(img);
			}
	}
}
}


let redFields = new Array();
let greenFields = new Array();


function clickCheker(id) {
changeCheker(id);
}


function changeCheker(id) {
var cheker = document.getElementById(id);

if (isBlack(cheker) || isWhite(cheker)) {
	if (isCheked) {
	return;
	}

	doCheking(cheker);

	highlightRequired(id);

	if (redFields.length == 0) {
		unrequiredMove(id);
	}

	isCheked = true;
} else if (isCheking(cheker)) {

	doUncheking(cheker, id);

	clearFields();

	isCheked = false;
}
}


function isKing(cheker) {
	return (cheker.src == blackKing || cheker.src == whiteKing || 
cheker.src == yellowKing);
}


function isBlack(cheker) {
	return cheker.src == blackKing || cheker.src == blackCheker;
}


function isWhite(cheker) {
	return cheker.src == whiteKing || cheker.src == whiteCheker;
}

function isCheking(cheker) {
	return cheker.src == yellowKing || cheker.src == yellowCheker;
}

function doCheking(cheker) {
	if (isKing(cheker)) {
		cheker.src = yellowKing;
	} else {
		cheker.src = yellowCheker;
	}
}

function unrequiredMove(id) {
var cheker = document.getElementById(id);
var parentId = cheker.parentElement.id;

var row = 8 - parentId.charAt(1);
var col = getCol(parentId);

if (isKing(cheker)) {
	greenFieldsForKing(row, col);
} else {
	greenFieldsForCheker(row, col, id);
}

}

function greenFieldsForCheker(row, col, id) {
if (id[0] == 'b' && row < 7 && col > 0 && board[row + 1][col - 1] == "") {
	doGreen(col - 1, 7 - row);
}

if (id[0] == 'b' && col < 7 && row < 7 && board[row + 1][col + 1] == "") {
	doGreen(col + 1, 7 - row);
}

if (id[0] == 'w' && col > 0 && row > 0 && board[row - 1][col - 1] == "") {
	doGreen(col - 1, 9 - row);
}

if (id[0] == 'w' && col < 7 && row > 0 && board[row - 1][col + 1] == ""){
	doGreen(col + 1, 9 - row);
}

}

function greenFieldsForKing(row, col) {
	topLeftGreenDiagonal(row, col);
	topRightGreenDiagonal(row, col);
	bottomLeftGreenDiagonal(row, col);
	bottomRightGreenDiagonal(row, col);
}

function highlightRequired(id) {
var cheker = document.getElementById(id);
var parentId = cheker.parentElement.id;
var parent = document.getElementById(parentId);

var row = 8 - parentId.charAt(1);
var col = getCol(parentId);

var item = '';
if (id[0] == 'b') {
	item = 'w';
} else {
	item = 'b';
}

if (isKing(cheker)) {
	redFieldsForKing(row, col, id, item);
} else {
	redFieldsForCheker(row, col, item);
}

}


function redFieldsForCheker(row, col, item) {
if (col > 1 && row < 6 && board[row + 1][col - 1].charAt(0) == item && 
	board[row + 2][col - 2] == "") {
	doRed(col - 2, 6 - row);
}

if (col < 6 && row < 6 && board[row + 1][col + 1].charAt(0) == item &&
	board[row + 2][col + 2] == "") {
	doRed(col + 2, 6 - row);
}

if (col > 1 && row > 1 && board[row - 1][col - 1].charAt(0) == item &&
	board[row - 2][col - 2] == "") {
	doRed(col - 2, 10 - row);
}

if (col < 6 && row > 1 && board[row - 1][col + 1].charAt(0) == item &&
	board[row - 2][col + 2] == ""){
	doRed(col + 2, 10 - row);
}

}

function redFieldsForKing(row, col, id, item) {
	topLeftDiagonal(row, col, id, item);
	topRightDiagonal(row, col, id, item);
	bottomLeftDiagonal(row, col, id, item);
	bottomRightDiagonal(row, col, id, item);
}

function topLeftDiagonal(row, col, id, item) {
if (col <= 1 || row <= 1) {
	return;
}
var curRow = row - 1;
var curCol = col - 1;
var elemTopLeft;
var isCutting = false;

while (curCol >= 0 && curRow >= 0) {
	elemTopLeft = board[curRow][curCol];
	if (elemTopLeft[0] == id[0]) {
		return;
	}
	if (isCutting) {
		if (elemTopLeft != "") {
			curRow--;
			curCol--;
			continue;
		} 
		doRed(curCol, 8 - curRow);
	}

	if (elemTopLeft[0] == item) {
		if (board[curRow - 1][curCol - 1] != "") {
			return;
		}
		isCutting = true;
	}
	curRow--;
	curCol--;
}
}

function topRightDiagonal(row, col, id, item) {
if (col >= 6 || row <= 1) {
	return;
}
var curRow = row - 1;
var curCol = col + 1;
var elemTopRight;
var isCutting = false;


while (curCol <= 7 && curRow >= 0) {
	elemTopRight = board[curRow][curCol];

	if (elemTopRight[0] == id[0]) {
		return;
	}
	if (isCutting) {
		if (elemTopRight != "") {
			curRow--;
			curCol++;
			continue;
		} 
		doRed(curCol, 8 - curRow);
	}

	if (elemTopRight[0] == item) {
		if (board[curRow - 1][curCol + 1] != "") {
			return;
		}
		isCutting = true;
	}
	curRow--;
	curCol++;
}
}

function bottomRightDiagonal(row, col, id, item) {
if (col >= 6 || row >= 6) {
	return;
}
var curRow = row + 1;
var curCol = col + 1;
var elemBottomRight;
var isCutting = false;


while (curCol <= 7 && curRow <= 7) {
	elemBottomRight = board[curRow][curCol];

	if (elemBottomRight[0] == id[0]) {
		return;
	}
	if (isCutting) {
		if (elemBottomRight != "") {
			curRow++;
			curCol++;
			continue;
		} 
		doRed(curCol, 8 - curRow);
	}

	if (elemBottomRight[0] == item) {
		if (board[curRow + 1][curCol + 1] != "") {
			return;
		}
		isCutting = true;
	}
	curRow++;
	curCol++;
}
}

function bottomLeftDiagonal(row, col, id, item) {
if (col <= 1 || row >= 6) {
	return;
}
var curRow = row + 1;
var curCol = col - 1;
var elemBottomRight;
var isCutting = false;


while (curCol >= 0 && curRow <= 7) {
	elemBottomRight = board[curRow][curCol];
	if (elemBottomRight[0] == id[0]) {
		return;
	}
	if (isCutting) {
		if (elemBottomRight != "") {
			curRow++;
			curCol--;
			continue;
		} 
		doRed(curCol, 8 - curRow);
	}

	if (elemBottomRight[0] == item) {
		if (board[curRow + 1][curCol - 1] != "") {
			return;
		}
		isCutting = true;
	}
	curRow++;
	curCol--;
}
}

function topLeftGreenDiagonal(row, col) {
if (col == 0 || row == 0) {
	return;
}
var curRow = row - 1;
var curCol = col - 1;
var elemTopLeft;
while (curCol >= 0 && curRow >= 0) {
	elemTopLeft = board[curRow][curCol];
	if (elemTopLeft != "") {
		return;
	}
	doGreen(curCol, 8 - curRow);
	curRow--;
	curCol--;
}
	
}

function topRightGreenDiagonal(row, col) {
if (col == 7 || row == 0) {
	return;
}
var curRow = row - 1;
var curCol = col + 1;
var elemTopRight;
while (curCol <= 7 && curRow >= 0) {
	elemTopRight = board[curRow][curCol];
	if (elemTopRight != "") {
		return;
	}
	doGreen(curCol, 8 - curRow);
	curRow--;
	curCol++;
}
}

function bottomLeftGreenDiagonal(row, col) {
if (col == 0 || row == 7) {
	return;
}
var curRow = row + 1;
var curCol = col - 1;
var elemTopRight;
while (curCol >=0 && curRow <= 7) {
	elemTopRight = board[curRow][curCol];
	if (elemTopRight != "") {
		return;
	}
	doGreen(curCol, 8 - curRow);
	curRow++;
	curCol--;
}
}

function bottomRightGreenDiagonal(row, col) {
if (col == 7 || row == 7) {
	return;
}
var curRow = row + 1;
var curCol = col + 1;
var elemTopRight;
while (curCol <= 7 && curRow <= 7) {
	elemTopRight = board[curRow][curCol];
	if (elemTopRight != "") {
		return;
	}
	doGreen(curCol, 8 - curRow);
	curRow++;
	curCol++;
}
}



function doRed(col, row) {
	var itemId = characters[col] + (row);
	var item = document.getElementById(itemId);
	redFields.push(itemId);
	item.style.backgroundColor  = '#FF6347';
}


function doGreen(col, row) {
	var itemId = characters[col] + (row);
	var item = document.getElementById(itemId);
	greenFields.push(itemId);
	item.style.backgroundColor  = '#7FFFD4';
}


function getCol(parentId) {
for (let i = 0; i < characters.length; i++) {
	if (characters[i] == parentId.charAt(0)) {
		return i;
	}
}
}


function doUncheking(cheker, id) {
if (!isKing(cheker)) {
	if (id[0] == 'b') {
		cheker.src = blackCheker;	
	} else {
		cheker.src = whiteCheker;
	}
} else {
	if (id[0] == 'b') {
		cheker.src = blackKing;	
	} else {
		cheker.src = whiteKing;
	}
}
}


function clearFields() {
while (redFields.length > 0) {
	var item = document.getElementById(redFields.pop());
	item.style.backgroundColor = '#111111';
}

while (greenFields.length > 0) {
	var item = document.getElementById(greenFields.pop());
	item.style.backgroundColor = '#111111';
}
}
