let length;
let gameView = document.querySelector(".game-view");
let cells = [];

do {
    length = Number(prompt("Please enter a number for the length of square for the game(it should be at least 10 and at most 30):"));
} while (isNaN(length) || length < 10 || length > 30);

for (let i = 0; i < length; i++) {
    cells.push([]);
    let row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < length; j++) {
        cells[i].push(Math.random() > .49);
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = `${40 / length}vw`;
        cell.style.height = `${40 / length}vw`;
        row.appendChild(cell);
    }
    gameView.appendChild(row);
}

let gameCells = document.querySelectorAll(".cell");

function updateUi() {
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            if (cells[i][j]) {
                gameCells[(i * length) + j].classList.add("alive");
                continue;
            }
            gameCells[(i * length) + j].classList.remove("alive");
        }
    }
}

function liveNeighborsCount(x, y) {
    let count = 0;
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (i >= 0 && i < cells.length && j >= 0 && j < cells[i].length && !(i === x && j === y)) {
                count += cells[i][j];
            }
        }
    }
    return count;
}

function updateGame(cells) {
    let liveNC;
    let newCells = [];
    for (let i = 0; i < length; i++) {
        newCells.push([]);
        for (let j = 0; j < length; j++) {
            newCells[i].push(0);
        }
    }
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            liveNC = liveNeighborsCount(i, j);
            if (cells[i][j]) {
                if (1 < liveNC && liveNC < 4) {
                    newCells[i][j] = 1;
                }
                continue;
            }
            if (liveNC === 3) {
                newCells[i][j] = 1;
            }
        }
    }
    return newCells;
}

updateUi();

setInterval(() => {
    cells = updateGame(cells);
    updateUi();
}, 1000);