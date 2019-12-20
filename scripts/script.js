// Variables
const container = document.getElementById("container");
let color = "black";
let rows = document.getElementsByClassName("row");


// Buttons 
const clearBtn = document.getElementById("btnClear");
const resizeBtn = document.getElementById("btnResize");
const randomBtn = document.getElementById("btnRandom");
const shadeBtn = document.getElementById("btnShade");
const colorBtn = document.getElementById("btnColor");
const gridBtn = document.getElementById("btnGrid");


// Event Listeners
clearBtn.addEventListener("click", () => clearCells());

resizeBtn.addEventListener("click", () => resizeCanvas());

randomBtn.addEventListener("click", () => {
    
    // Change button text onclick and disable/enable function
    if (randomBtn.textContent == "Random color on") {
        randomBtn.textContent = "Random color off";
        attachColorCells(color);
    } else { 
        if (shadeBtn.textContent == "Shade mode on") {
            shadeBtn.textContent = "Shade mode off";
        }
        randomBtn.textContent = "Random color on";
        rngColorCells();
    }
});

shadeBtn.addEventListener("click", () => {
    
    // Change button text onclick and disable/enable function
    if (shadeBtn.textContent == "Shade mode on") {
        shadeBtn.textContent = "Shade mode off";
        attachColorCells(color);
    } else {
        // Ask for consent before clearing canvas
        let clearCheck = confirm("WARNING, this will clear your canvas")

        if (clearCheck == false) {
        // If no consent do nothing, else clear grid and initialize function
        } else {
    
            if (randomBtn.textContent == "Random color on") {
                randomBtn.textContent = "Random color off";
            }
            shadeBtn.textContent = "Shade mode on";
            let gridSize = document.querySelectorAll(".row");
            
            while(container.firstChild) {
                container.removeChild(container.firstChild);
            }
            mkGrid(gridSize.length);
            clearCells();
            shadeMode();
        }
    }
});

colorBtn.addEventListener("change", () => {
    
    // Change button text onclick and disable/enable function
    shadeBtn.textContent = "Shade mode off"
    randomBtn.textContent = "Random color off"
    color = colorBtn.value;
    attachColorCells(color);
});

gridBtn.addEventListener("click", () => {
    
    // Change button text onclick and disable/enable function
    if (gridBtn.textContent == "Grid off") {
        gridBtn.textContent = "Grid on";
        let grid = document.querySelectorAll(".cell");
        grid.forEach((cell) => {
            cell.classList.add("grid");
        })
    } else {
        gridBtn.textContent = "Grid off";
        let grid = document.querySelectorAll(".cell");
        grid.forEach((cell) => {
            cell.classList.remove("grid");
        })
    }
});


// Functions

function mkGrid(number) {
    // Creates grid

    // Create rows
    for (i = 0; i < number; i++) {
        let row = document.createElement("div");
        row.className = "row";
        container.appendChild(row);
    }
    
    // Create cells in rows
    for (i = 0; i < rows.length; i++) {
        for (j = 0; j < number; j++) {
            let newCell = document.createElement("div");
            let containerSize = container.scrollWidth;
            newCell.style.height = `${containerSize / number}px`;
            newCell.style.width = `${containerSize / number}px`;
            newCell.classList.add("cell");
            if (gridBtn.textContent == "Grid on") {
                newCell.classList.add("grid");
                addBorderGrid(newCell, j, i, number, rows);
            }
            addBorderGrid(newCell, j, i, number, rows);
        }
    }
}

function addBorderGrid(newCell, j, i, number, rows) {
    // Adds border to cells near the edge
    
    // Adds border to top cells
    if (j == 0) {
        if (i == 0) {
            newCell.classList.add("gridCellUp", "gridCellLeft");
            rows[j].appendChild(newCell);
        } else if (i == (number - 1)) {
            newCell.classList.add("gridCellUp", "gridCellRight");
            rows[j].appendChild(newCell);
        } else {
            newCell.classList.add("gridCellUp");
            rows[j].appendChild(newCell);
        }
    }
    
    // Adds border to bottom cells
    if (j == (number - 1)) {
        if (i == 0) {
            newCell.classList.add("gridCellLeft", "gridCellBottom");
            rows[j].appendChild(newCell);
        } else if (i == (number - 1)) {
            newCell.classList.add("gridCellBottom", "gridCellRight");
            rows[j].appendChild(newCell);
        } else {
            newCell.classList.add("gridCellBottom");
            rows[j].appendChild(newCell);
        }
    }
    
    // Adds border to left and right cells
    if (i == 0) {
        newCell.classList.add("gridCellLeft");
        rows[j].appendChild(newCell);
    }
    if (i == (number - 1)) {
        newCell.classList.add("gridCellRight");
        rows[j].appendChild(newCell);
    }
    rows[j].appendChild(newCell);
}

function attachColorCells(color) {
    // Attaches listener to cells

    // Change cell color on hover
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener("mouseenter", () => {
            cell.style.backgroundColor = color;
        });
    });
}

function clearCells() {
    // Clears canvas
    
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.style.backgroundColor = "rgb(255, 255, 255)";
    });
}

function resizeCanvas() {
    // Resizes canvas
    
    // Prompt for canvas size and validate it
    let size;
    do {
        size = prompt("Enter canvas size (1 - 64)");
    } while (isNaN(size) == true || Number(size) <= 0 || Number(size) > 64 || size == null);

    // Delete old canvas
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Create new canvas, intializes it and changes button texts
    shadeBtn.textContent = "Shade mode off";
    randomBtn.textContent = "Random color off";
    mkGrid(size);
    attachColorCells(color);
}

function rngColorGenerator() {
    // Generates random hex color
    
    let letters = '0123456789ABCDEF';
    let rngColor = '#';
    
    for (let i = 0; i < 6; i++) {
      rngColor += letters[Math.floor(Math.random() * 16)];
    }
    return rngColor;
}

function rngColorCells() {
    // Attaches RNG color listener to cells
    
    // Changes cell background color to a color generated by rngColorGenerator
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener("mouseenter", () => {
            cell.style.backgroundColor = rngColorGenerator();
        });
    });
}

function getRgb(rgbvalue) {
    // Gets the numbers out of a rgb value

    let rgb = rgbvalue.slice(4);
    rgb = rgb.replace(/,/g, "");
    rgb = rgb.replace(/[()]/g, "");
    return rgb.split(" ");
}

function shadeMode() {
    // Attaches a shadeMode listener to cells
    
    // Changes a cells color to a 20% darker color
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener("mouseenter", () => {
            let curColor = getRgb(cell.style.backgroundColor);
            if (curColor[0] == 0 || curColor[1] == 0 || curColor[2] == 0) {
            } else {
                cell.style.backgroundColor = `rgb(${curColor[0] - 51}, ${curColor[1] - 51}, ${curColor[2] - 51})`;
            }
        });
    });
}

// Initialize grid
mkGrid(16);
attachColorCells(color);
