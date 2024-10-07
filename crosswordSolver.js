// Add puzzle and words after this line
const puzzle = '2000\n0...\n0...\n0...'
const words = ['abba', 'assa']
let solutions = []
// main function
function crosswordSolver(puzzle, words) {
    if (!validInputs(puzzle, words)) {
        console.log('Error: input is not valid!')
        return
    }
    const puzzleGrid = puzzle.split("\n")
    for (let i = 0; i < puzzleGrid.length; i++) {
        puzzleGrid[i] = puzzleGrid[i].split('')
    }
    solvePuzzle(puzzleGrid, puzzleGrid, words)
    if (solutions.length == 0) {
        console.log('Error: no solutin found!')
    } else if (solutions.length > 1) {
        console.log('Error: multiple solutin found!')
    } else {
        console.log(gridToString(solutions[0]))
    }
}
function gridToString(sol) {
    for (let i = 0; i < sol.length; i++) {
        sol[i] = [sol[i].join('')]
    }
    return sol.join('\n')
}
function validInputs(puzzle, words) {
    // valid puzzle type and check if words or puzzle are empty
    if (puzzle.length == 0 || words.length == 0 || typeof (puzzle) != 'string') {
        return false
    }
    // check type of words
    for (let i = 0; i < words.length; i++) {
        if (typeof (words[i]) != 'string') {
            return false
        }
    }
    // check if puzzle containe a char that is not one of 0, 1, 2, \n or ., and count the number of 
    // words in puzzle and compare it with the nuber of words
    let counter=0
    for (let i = 0; i < puzzle.length; i++) {
        if (puzzle[i] != '\n' && puzzle[i] != '0' && puzzle[i] != '1' && puzzle[i] != '2' && puzzle[i] != '.') {
            return false
        }
        if ( puzzle[i] != '.' && puzzle[i] != '\n') {
            counter += Number(puzzle[i])
        }
    }
    if (counter != words.length){
        return false
    }
    // check if word repeated
    let wordsMap = new Map();
    for (let i = 0; i < words.length; i++) {
        if (wordsMap.get(words[i]) == undefined)  {
            wordsMap.set(words[i], true)
        } else {
            return false 
        }
    }
    return true
}
function checkSlolutions(solution){
    let regex=/[a-zA-Z\.]/
    for (let i=0;i<solution.length;i++){
        for (let j=0;j<solution[i].length;j++){
            if  (!regex.test(solution[i][j])){
                return false
            }
        }
    }
    return true
}
function solvePuzzle(constPuzzle, resultePuzzle, words) {
    if (words.length === 0) {
        if (checkSlolutions(resultePuzzle)){
            solutions.push(resultePuzzle)
        }
        
        return
    }
    // Iterate over the Puzzle grid
    for (let i = 0; i < constPuzzle.length; i++) {
        for (let j = 0; j < constPuzzle[i].length; j++) {
            if (constPuzzle[i][j] == '1' || constPuzzle[i][j] == '2') {
                // Deep copy the resultePuzzle for vertical/horizontal placements
                let coppyVertical = copy(resultePuzzle);
                let coppyHorizontal = copy(resultePuzzle)
                // Try placing the word vertically
                if (writeVertical(coppyVertical, i, j, words[0]) !== 'Error') {
                    let puzzleCopy = copy(constPuzzle);  // Deep copy Puzzle
               
                    
                    if (puzzleCopy[i][j] == '2') {
                        puzzleCopy[i][j] = '1'
                    } else {
                        puzzleCopy[i][j] = '0'
                    }
                    
                    // Recurse with the updated puzzle and the remaining wordsrtical = copy(
                    solvePuzzle(puzzleCopy, coppyVertical, words.slice(1));
                }
                // Try placing the word horizontally
                if (writeHorizantale(coppyHorizontal, i, j, words[0]) !== 'Error') {
                    let puzzleCopy = copy(constPuzzle);  // Deep copy Puzzle
                    if (puzzleCopy[i][j] == '2') {
                        puzzleCopy[i][j] = '1'
                    } else {
                        puzzleCopy[i][j] = '0'
                    }
                    // Recurse with the updated puzzle and the remaining words
                    solvePuzzle(puzzleCopy, coppyHorizontal, words.slice(1));
                }
            }
        }
    }
}
function copy(grid) {
    let gridCopy = []
    for (let i = 0; i < grid.length; i++) {
        gridCopy.push(grid[i].slice())
    }
    return gridCopy
}
function writeHorizantale(puzzle, x, y, word) {
    if (y + word.length > puzzle[x].length) {
        return 'Error'
    }
    for (let i = y; i < y + word.length; i++) {
        if (puzzle[x][i] == '1' || puzzle[x][i] == '2' || puzzle[x][i] == '0') {
            puzzle[x][i] = word[i - y]
        } else if (puzzle[x][i] != word[i - y]) {
            return 'Error'
        }
    }
}
function writeVertical(puzzle, x, y, word) {
    if (x + word.length > puzzle.length) {
        return 'Error'
    }
    for (let i = x; i < x + word.length; i++) {
        if (puzzle[i][y] == '1' || puzzle[i][y] == '2' || puzzle[i][y] == '0') {
            puzzle[i][y] = word[i - x]
        } else if (puzzle[i][y] != word[i - x]) {
            return 'Error'
        }
    }
}
crosswordSolver(puzzle, words)
