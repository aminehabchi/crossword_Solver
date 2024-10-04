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
                if (writeHorizontal(coppyHorizontal, i, j, words[0]) !== 'Error') {
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
