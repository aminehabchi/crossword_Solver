const puzzle = `...1...........
..1000001000...
...0....0......
.1......0...1..
.0....100000000
100000..0...0..
.0.....1001000.
.0.1....0.0....
.10000000.0....
.0.0......0....
.0.0.....100...
...0......0....
..........0....`
const words = [
  'sun',
  'sunglasses',
  'suncream',
  'swimming',
  'bikini',
  'beach',
  'icecream',
  'tan',
  'deckchair',
  'sand',
  'seaside',
  'sandals',
].reverse()

crosswordSolver(puzzle, words)

function crosswordSolver(ep, words) {
    let emptyPuzzle = ep.split("\n")
    let epp = []
    for (let i = 0; i < emptyPuzzle.length; i++) {
        epp.push(stringToBytes(emptyPuzzle[i]))
    }
    let w = []
    for (let i = 0; i < words.length; i++) {
        w.push(stringToBytes(words[i]))
    }
   //console.log(writeVertical(epp, 0, 0, w[0]))
    let o=backtrack(epp,epp, w)
    if (o=='Error'){
        console.log(o)
    }else{
        let a=byteArray2DToStringArray(o);
        for (let i=0;i<a.length;i++){
            console.log(a[i])
        }
    }
}
function byteArray2DToStringArray(byteArray2D) {
    return byteArray2D.map(byteArray => {
        return String.fromCharCode(...byteArray);
    });
}
function stringToBytes(str) {
    const encoder = new TextEncoder();
    const byteArray = encoder.encode(str);
    return Array.from(byteArray);
}


function backtrack(Puzzle, emptyPuzzle, words) {
    if (words.length === 0) {
        return emptyPuzzle;  // Return the completed puzzle instead of 'Error'
    }
    // Iterate over the Puzzle grid
    for (let i = 0; i < Puzzle.length; i++) {
        for (let j = 0; j < Puzzle[i].length; j++) {
            if (Puzzle[i][j] == 49 || Puzzle[i][j] == 50) {

                // Deep copy the emptyPuzzle for vertical/horizontal placements
                let coppyVertical = emptyPuzzle.map(arr => arr.slice());
                let coppyHorizontal = emptyPuzzle.map(arr => arr.slice());

                // Try placing the word vertically
                if (writeVertical(coppyVertical, i, j, words[0]) !== 'Error') {
                    let puzzleCopy = Puzzle.map(arr => arr.slice());  // Deep copy Puzzle
                    puzzleCopy[i][j]--;  // Decrease constraint

                    // Recurse with the updated puzzle and the remaining words
                    const result = backtrack(puzzleCopy, coppyVertical, words.slice(1));
                    if (result !== 'Error') {
                        return result;
                    }
                }

                // Try placing the word horizontally
                if (writeHorizantale(coppyHorizontal, i, j, words[0]) !== 'Error') {
                    let puzzleCopy = Puzzle.map(arr => arr.slice());  // Deep copy Puzzle
                    puzzleCopy[i][j]--;  // Decrease constraint

                    // Recurse with the updated puzzle and the remaining words
                    const result = backtrack(puzzleCopy, coppyHorizontal, words.slice(1));
                    if (result !== 'Error') {
                        return result;
                    }
                }
            }
        }
    }

    return 'Error';  // Return 'Error' if no solution is found
}


function writeHorizantale(e, x, y, w) {
    if (y + w.length > e[x].length) {
        return 'Error'
    }
    for (let i = y; i < y + w.length; i++) {
        if (e[x][i] == 50 || e[x][i] == 48 || e[x][i] == 49) {
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
        if (e[i][y] == 50 || e[i][y] == 48 || e[i][y] == 49) {
            e[i][y] = w[i - x]
        } else if (e[i][y] != w[i - x]) {
            return 'Error'
        }
    }
    return e
}
