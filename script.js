var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;


var gameOver = false;
var board;


var rows = 6;
var columns = 7;
var currColumns = [];


window.onload = function () {
    setGame();

    document 
        .getElementById("restart-btn")
        .addEventListener("click", restartGame);
};


function setGame() {
    document.getElementById("board").innerHTML = "";

    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];

        for (let c = 0; c < columns; c++) {
            row.push(" ");


            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);

            document.getElementById("board").append(tile);
        }

        board.push(row);
    }
}


function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let c = parseInt(coords[1]);

    let r = currColumns[c];

    if (r < 0) {
        return;
    }

    board[r][c] = currPlayer;

    let tile = document.getElementById(
        r.toString() + "-" + c.toString()
    );

    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
        document.getElementById("turn").innerText = 
            "Current Turn: Yellow";
    } else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
        document.getElementById("turn").innerText = 
            "Current Turn: Red";
    }

    currColumns[c]--;

    checkWinner();
}


function checkWinner() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if ( 
                board[r][c] != " " &&
                board[r][c] == board[r][c + 1] && 
                board[r][c + 1] == board[r][c + 2] &&
                board[r][c + 2] == board[r][c + 3]
            ) {
                setWinner(r, c);
                return;
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (
                board[r][c] != " " &&
                board[r][c] == board[r + 1][c] &&
                board[r + 1][c] == board[r + 2][c] &&
                board[r + 2][c] == board[r + 3][c]
            ) {
                setWinner (r, c);
                return;
            }
        }
    }

    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns -3; c++) {
            if (
                board[r][c] != " " &&
                board[r][c] == board[r + 1][c + 1] &&
                board[r + 1][c + 1] == board[r + 2][c + 2] &&
                board[r + 2][c + 2] == board[r + 3][c + 3]
            ) {
                setWinner(r, c);
                return;
            }
        }
    }

    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns -3; c++) {
            if (
                board[r][c] != " " &&
                board[r][c] == board[r - 1][c + 1] &&
                board[r - 1][c + 1] == board[r - 2][c + 2] &&
                board[r - 2][c + 2] == board[r - 3][c + 3]
            ) {
                setWinner(r, c);
                return;
            }
        }
    }
}


function setWinner(r, c) {
    let winner = document.getElementById("winner");

    if (board[r][c] == playerRed) {
        winner.innerText = "🔴 Red Wins!";
    }
    else {
        winner.innerText = "🟡 Yellow Wins!";
    }

    gameOver = true;
}


function restartGame() {
    gameOver = false;
    currPlayer = playerRed;

    document.getElementById("winner").innerText = "";
    document.getElementById("turn").innerText = 
        "Current Turn: Red";

        setGame();
}