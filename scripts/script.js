const container = document.getElementById("container");
let rows = document.getElementsByClassName("row");

function mkDefaultGrid(number) {
    for (i = 0; i < number; i++) {
        let row = document.createElement("div");
        row.className = "row";
        container.appendChild(row);
    }
    for (i = 0; i < rows.length; i++) {
        for (j = 0; j < number; j++) {
            let newCell = document.createElement("div");
            let containerSize = container.scrollWidth;
            newCell.style.height = `${containerSize / number}px`;
            newCell.style.width = `${containerSize / number}px`;
            rows[j].appendChild(newCell).className = "cell";
        }
    }
}

const clearBtn = document.getElementById("btnClear");
clearBtn.addEventListener("click", () => clearCells());

function colorCells(color) {
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener("mouseenter", () => {
            cell.style.backgroundColor = color;
        });
    });
}

function clearCells() {
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.style.backgroundColor = "white";
    });
}

mkDefaultGrid(16);
colorCells("black");