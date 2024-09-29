let TurnO = true;
let winnerO = false;
let winnerX = false;

function create2dArray() {
    let buttonCollection = [];
    let rows = 7, columns = 7;

    for (let i = 0; i < rows; i++) {
        buttonCollection[i] = [];
        for (let j = 0; j < columns; j++) {
            buttonCollection[i][j] = null;
        }
    }

    return buttonCollection;
}

function takeButtons() {
    let buttonCollection = create2dArray();
    for (let i = 0; i < 7; i++) {
        let buttonsRow = document.querySelectorAll(`.row${i+1} .but_col`);

        for (let j = 0; j < 7; j++) {
            buttonCollection[i][j] = buttonsRow[j];
        }
    }
    return buttonCollection;
}

function showTable() {
    let buttonCol = [];
    let rows = 7, columns = 7;

    for (let i = 0; i < rows; i++) {
        buttonCol[i] = [];
        for (let j = 0; j < columns; j++) {
            buttonCol[i][j] = null;
        }
    }

    for (let i = 0; i < 7; i++) {
        let buttonsRow = document.querySelectorAll(`.row${i+1} .but_col`);
        for (let j = 0; j < 7; j++) {
            buttonCol[i][j] = buttonsRow[j].innerHTML;
        }
    }
    return buttonCol;
}

function displayAvailableMoves(buttonsCollection, x, y) {
    if (buttonsCollection[x][y].textContent === "X" || buttonsCollection[x][y].textContent === "O") {
        if (x > 0) {
            buttonsCollection[x-1][y].textContent = "-";
            buttonsCollection[x-1][y].style.background = "#cfcdc8";
        }
    }
}

function displayRestartButton(){
    winnerO = false;
    winnerX = false;
    let restartButton = document.getElementById("restartButton");
    restartButton.style.display = "block";
    restartButton.addEventListener("click", function() {
        let buttonsCollection = takeButtons();
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 7; j++) {
                if (i == 6){
                    let buttonsRow7 = document.querySelectorAll(`.row7 .but_col`);
                    buttonsRow7[j].textContent = "-";
                    buttonsRow7[j].style.background = "#cfcdc8";
                }else{
                    buttonsCollection[i][j].style.background = "black";
                    buttonsCollection[i][j].textContent = "";
                }
                buttonsCollection[i][j].disabled = false;
            }
        }
        restartButton.style.display = "none";
        let board = document.getElementById("board");
        board.innerText = "The game is on";

    });
}

function disableButtons(){
    let buttonsCollection = takeButtons();
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            buttonsCollection[i][j].disabled = true;
        }
    }
}

function checkWin(buttons2d, x, y, buttonsTEXT) {
    // check row
    let inrow = 1;
    let i = 0;
    while (i < 6) {
        if(buttonsTEXT[x][i] === buttonsTEXT[x][i+1] && (buttonsTEXT[x][i] == "X" || buttonsTEXT[x][i] == "O")) {
            inrow++;
        }else if (inrow >= 4) {
            break;
        }else if (buttonsTEXT[x][i] !== buttonsTEXT[x][i+1] && (buttonsTEXT[x][i] == "X" || buttonsTEXT[x][i] == "O")){
            inrow = 1;
        }
        i++;
    }
    // check column
    let incolumn = 1;
    i = 0;
    while (i < 6) {
        if(buttonsTEXT[i][y] === buttonsTEXT[i+1][y] && (buttonsTEXT[i][y] == "X" || buttonsTEXT[i][y] == "O")) {
            incolumn++;
        }else if (incolumn >= 4) {
            break;
        }else if (buttonsTEXT[i][y] !== buttonsTEXT[i+1][y] && (buttonsTEXT[i][y] == "X" || buttonsTEXT[i][y] == "O")){
            incolumn = 1;
        }
        i++;
    }

    if (incolumn >= 4 || inrow >= 4) {
        if (buttons2d[x][y].textContent === "X") {
            winnerX = true;
            let board = document.getElementById("board");
            board.innerText = "RED wins";
        }else if (buttons2d[x][y].textContent === "O") {
            winnerO = true;
            let board = document.getElementById("board");
            board.innerText = "BLUE wins";
        }
    }
    checkDiagonals(buttonsTEXT, x, y);

    if (winnerX || winnerO) {
        displayRestartButton();
        disableButtons();
    }
}

function checkDiagonals(buttons2d, x, y) {
    // check diagonal (bottom-left to top-right)
    let xinD1 = 1;
    let oinD1 = 1;
    let ii = x, jj = y;

    while (ii > 0 && jj < 6) {
        ii -= 1;
        jj += 1;
        if (buttons2d[ii][jj] === buttons2d[x][y] && buttons2d[ii][jj] === "X") {
            xinD1 += 1;
        } else if (buttons2d[ii][jj] === buttons2d[x][y] && buttons2d[ii][jj] === "O") {
            oinD1 += 1;
        } else {
            break;
        }
    }

    // bottom left
    ii = x, jj = y;
    while (ii < 6 && jj > 0) {
        ii += 1;
        jj -= 1;
        if (buttons2d[ii][jj] === buttons2d[x][y] && buttons2d[ii][jj] === "X") {
            xinD1 += 1;
        } else if (buttons2d[ii][jj] === buttons2d[x][y] && buttons2d[ii][jj] === "O") {
            oinD1 += 1;
        } else {
            break;
        }
    }

    // check diagonal (bottom-right to top-left)
    let xinD2 = 1;
    let oinD2 = 1;
    ii = x, jj = y;
    while (ii > 0 && jj > 0) {
        ii -= 1;
        jj -= 1;
        if (buttons2d[ii][jj] === buttons2d[x][y] && buttons2d[ii][jj] === "X") {
            xinD2 += 1;
        } else if (buttons2d[ii][jj] === buttons2d[x][y] && buttons2d[ii][jj] === "O") {
            oinD2 += 1;
        } else {
            break;
        }
    }

    ii = x, jj = y;
    while (ii < 6 && jj < 6) {
        ii += 1;
        jj += 1;
        if (buttons2d[ii][jj] === buttons2d[x][y] && buttons2d[ii][jj] === "X") {
            xinD2 += 1;
        } else if (buttons2d[ii][jj] === buttons2d[x][y] && buttons2d[ii][jj] === "O") {
            oinD2 += 1;
        } else {
            break;
        }
    }
    if (xinD1 >= 4 || xinD2 >= 4) {
        winnerX = true;
        let board = document.getElementById("board");
        board.innerText = "RED wins";
    } else if (oinD1 >= 4 || oinD2 >= 4) {
        winnerO = true;
        let board = document.getElementById("board");
        board.innerText = "BLUE wins";
    }
}

function createFunctionsButtons() {
    for (let i = 0; i < 7; i++) {
        let buttons = document.querySelectorAll(`.row${i+1} .but_col`);

        let buttonsRow7 = document.querySelectorAll(`.row7 .but_col`);
        buttonsRow7[i].textContent = "-";
        buttonsRow7[i].style.background = "#cfcdc8";
        for (let j = 0; j < 7; j++) {
            buttons[j].addEventListener("click", function() {
                if (TurnO && buttons[j].textContent === "-") {
                    buttons[j].textContent = "O";
                    buttons[j].style.background = "#2a3bbf";
                    TurnO = false;
                } else if (!TurnO && buttons[j].textContent === "-") {
                    buttons[j].textContent = "X";
                    buttons[j].style.background = "#cc3547";
                    TurnO = true;
                }
                let buttonsCollection = takeButtons();
                displayAvailableMoves(buttonsCollection, i, j);
                checkWin(buttonsCollection, i, j, showTable());
            });
        }
    }
}

window.onload = function() {
    createFunctionsButtons();
};
