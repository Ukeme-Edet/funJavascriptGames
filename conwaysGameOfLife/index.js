let cells = [];
for (let i = 0; i < 25; i++) {
    cells.push([]);
    for (let j = 0; j < 25; j++) {
        cells[i].push(Math.random() > .49);
    }
}
let gameCells = document.querySelectorAll(".cell");
console.log(gameCells);
function updateUi() {
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            if (cells[i][j]) {
                gameCells[(i * 25) + j].classList.add("alive");
                continue;
            }
            gameCells[(i * 25) + j].classList.remove("alive");
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
    for (let i = 0; i < 25; i++) {
        newCells.push([]);
        for (let j = 0; j < 25; j++) {
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