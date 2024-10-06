const puzzle = '2001\n0..0\n1000\n0..0'
const words = ['casa', 'alan', 'ciao', 'anta']




let solutions = []
crosswordSolver(puzzle, words)

function crosswordSolver(ep, words) {
    if (checker(ep, words)) {
        console.log('Error')
        return
    }
    let emptyPuzzle = ep.split("\n")
    for (let i = 0; i < emptyPuzzle.length; i++) {
        emptyPuzzle[i] = emptyPuzzle[i].split('')
    }
    backtrack(emptyPuzzle, emptyPuzzle, words)
    if (solutions.length != 1) {
        console.log('Error')
    } else {
        console.log(convertToString(solutions[0]))
    }

}
function convertToString(o) {
    for (let i = 0; i < o.length; i++) {
        o[i] = [o[i].join('')]
    }
    return o.join('\n')
}
function checker(puzzle, words) {
    if (puzzle.length == 0 || words.length == 0 || typeof (puzzle) != 'string') {
        return true
    }
    for (let i = 0; i < words.length; i++) {
        if (typeof (words[i]) != 'string') {
            return true
        }
    }
    let counter=0
    for (let i = 0; i < puzzle.length; i++) {
        if (puzzle[i] != '\n' && puzzle[i] != '0' && puzzle[i] != '1' && puzzle[i] != '2' && puzzle[i] != '.') {
            return true
        }
        if ( puzzle[i] != '.' && puzzle[i] != '\n') {
            counter+=Number(puzzle[i])
        }
    }
    if (counter!=words.length){
        return true
    }
    let wordsMap = new Map();
    for (let i = 0; i < words.length; i++) {
        if (wordsMap.get(words[i]) == undefined)  {
            wordsMap.set(words[i], true)
        } else {
            return true 
        }
    }
    return false
}
function checkSlolutions(solutions){
    let regex=/[a-zA-Z\.]/
    for (let i=0;i<solutions.length;i++){
        for (let j=0;j<solutions[i].length;j++){
            if  (!regex.test(solutions[i][j])){
                return false
            }
        }
    }
    return true
}
function backtrack(Puzzle, emptyPuzzle, words) {
    if (words.length === 0) {
        if (checkSlolutions(emptyPuzzle)){
            solutions.push(emptyPuzzle)
        }
        
        return
    }
    // Iterate over the Puzzle grid
    for (let i = 0; i < Puzzle.length; i++) {
        for (let j = 0; j < Puzzle[i].length; j++) {
            if (Puzzle[i][j] == '1' || Puzzle[i][j] == '2') {

                // Deep copy the emptyPuzzle for vertical/horizontal placements
                let coppyVertical = copy(emptyPuzzle);
                let coppyHorizontal = copy(emptyPuzzle)

                // Try placing the word vertically
                if (writeVertical(coppyVertical, i, j, words[0]) !== 'Error') {
                    let puzzleCopy = copy(Puzzle);  // Deep copy Puzzle
                    if (puzzleCopy[i][j] == '2') {
                        puzzleCopy[i][j] = '1'
                    } else {
                        puzzleCopy[i][j] = '0'
                    }
                    // Recurse with the updated puzzle and the remaining words
                    backtrack(puzzleCopy, coppyVertical, words.slice(1));

                }

                // Try placing the word horizontally
                if (writeHorizantale(coppyHorizontal, i, j, words[0]) !== 'Error') {
                    let puzzleCopy = copy(Puzzle);  // Deep copy Puzzle
                    if (puzzleCopy[i][j] == '2') {
                        puzzleCopy[i][j] = '1'
                    } else {
                        puzzleCopy[i][j] = '0'
                    }

                    // Recurse with the updated puzzle and the remaining words
                    backtrack(puzzleCopy, coppyHorizontal, words.slice(1));
                }
            }
        }
    }
}
function copy(e) {
    let a = []
    for (let i = 0; i < e.length; i++) {
        a.push(e[i].slice())
    }
    return a
}

function writeHorizantale(e, x, y, w) {
    if (y + w.length > e[x].length) {
        return 'Error'
    }
    for (let i = y; i < y + w.length; i++) {
        if (e[x][i] == '1' || e[x][i] == '2' || e[x][i] == '0') {
            e[x][i] = w[i - y]
        } else if (e[x][i] != w[i - y]) {
            return 'Error'
        }
    }
    return e
}
function writeVertical(e, x, y, w) {
    if (x + w.length > e.length) {
        return 'Error'
    }
    for (let i = x; i < x + w.length; i++) {
        if (e[i][y] == '1' || e[i][y] == '2' || e[i][y] == '0') {
            e[i][y] = w[i - x]
        } else if (e[i][y] != w[i - x]) {
            return 'Error'
        }
    }
    return e
}
