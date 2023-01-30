const grid = document.getElementById("sudoku-grid");
const solveButton = document.getElementById("solve-button");
const resetButton = document.getElementById("reset-button");

let puzzle = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
];
let charPuzzle = puzzle.map(row => row.split(''))

let table = document.getElementById("sudoku-grid");
for (let i = 0; i < puzzle.length; i++) {
  let row = table.rows[i];
  for (let j = 0; j < puzzle[i].length; j++) {
    if (puzzle[i][j] != '-') {
        let cell = row.cells[j];
        cell.innerHTML = puzzle[i][j];
       // cell.classList.add("tile-start");
    }
  }
}

solveButton.addEventListener("click", function() {
    solveSudoku(charPuzzle);
    for (let i = 0; i < charPuzzle.length; i++) {
        let row = table.rows[i];
        for (let j = 0; j < charPuzzle[i].length; j++) {
            let cell = row.cells[j];
            cell.innerHTML = charPuzzle[i][j];
        }
    }
});


resetButton.addEventListener("click", function() {
    clearPuzzle();
    puzzle=generatePuzzle(); charPuzzle = puzzle.map(row => row.split(''));
    for (let i = 0; i < puzzle.length; i++) {
        let row = table.rows[i];
        for (let j = 0; j < puzzle.length; j++) {
            if (puzzle[i][j] !== '-') {
                let cell = row.cells[j];
                cell.innerHTML = puzzle[i][j];
                //cell.classList.add("tile-start");
            }
            else{
                let cell = row.cells[j];
                cell.innerHTML = ' ';
               // cell.classList.add("tile-start");
            }
        }
        }

    let numToRemove = Math.floor(Math.random() * 45) + 20;
    for (let i = 0; i < numToRemove; i++) {
        let randRow = Math.floor(Math.random() * 9);
        let randCol = Math.floor(Math.random() * 9);
        while (puzzle[randRow][randCol] === '-') {
            randRow = Math.floor(Math.random() * 9);
            randCol = Math.floor(Math.random() * 9);
        }
        table.rows[randRow].cells[randCol].innerHTML = ' ';
    }
  });


 function clearPuzzle() {
    for (let i = 0; i < charPuzzle.length; i++) {
        for (let j = 0; j < charPuzzle[i].length; j++) {
            charPuzzle[i][j] = "-";
        }
    }
    for (let i = 0; i < puzzle.length; i++) {
        let row = table.rows[i];
        for (let j = 0; j < puzzle.length; j++) {
            let cell = row.cells[j];
            cell.innerHTML = charPuzzle[i][j];
        }
    }
}

function generatePuzzle() {
    var easy=[ 
        "--74916-5",  
    "2---6-3-9",   
    "-----7-1-",  
    "-586----4", 
    "--3----9-",
    "--62--187", 
    "9-4-7---2", 
    "67-83----", 
    "81--45---"]
    
    var medium= [  
        "-----7--3",
    "-1-------",    
    "36---5--7",        
    "-3679---8",        
    "--7-8-2--",        
    "5----2---",        
    "-78234-6-",        
    "-9----3--",        
    "-----84--"]
    
    var hard= [        
        "--976-418",        
        "-1-4-2376",        
        "------9--",        
        "---------",        
        "----8---1",        
        "---95--6-",        
        "9--------",        
        "78----1-4",        
        "-246-97--"]

    var puzzles = [easy, medium, hard];
    var randomIndex = Math.floor(Math.random() * puzzles.length);
    return puzzles[randomIndex];
}

function solveSudoku(grid) {
    let row, col, num;
    for (row = 0; row < 9; row++) {
        for (col = 0; col < 9; col++) {
            if (grid[row][col] === '-') {
                for (num = 1; num <= 9; num++) {
                    if (isSafe(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (solveSudoku(grid)) {
                            return true;
                        } else {
                            grid[row][col] = '-';
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isSafe(grid, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] == num || grid[x][col] == num) {
            return false;
        }
    }
    let startRow = row - row % 3;
    let startCol = col - col % 3;
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (grid[r + startRow][c + startCol] == num) {
                return false;
            }
        }
    }
    return true;
}
