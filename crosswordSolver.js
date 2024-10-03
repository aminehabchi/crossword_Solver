const puzzle = `2001
0..0
1000
0..0`
const words = ['casa', 'alan', 'ciao', 'anta']
crosswordSolver(puzzle, words)
function crosswordSolver(ep, words) {
    let emptyPuzzle = convertTo2DArray(ep.split("\n"))
    let wordMap=convertWordToMap(words)
    console.log(backtrack(emptyPuzzle,wordMap))
    console.log(getWords(wordMap,0,4))
}

function backtrack(emptyPuzzle, wordmap) {
    for (let i = 0; i < emptyPuzzle.length; i++) {
        for (let j = 0; j < emptyPuzzle[i].length; j++) {
            if (emptyPuzzle[i][j]>'0' && emptyPuzzle[i][j]<='9'){
                let right=clRight(emptyPuzzle,i,j)
                let Left=clLeft(emptyPuzzle,i,j)
                
            }
        }
    }

    return emptyPuzzle
}

function getWords(wordmap,l,r){
    let w=[]
    for (let [_, value] of wordmap) {
        for (let j=0;j<value.length;j++){
            if (value[j].length==l || value[j].length==r){
                w.push(value[j])
            }   
        }
    }
    return w
}

function convertTo2DArray(arr) {
    return arr.map(str => str.split(''));
}
function writeHorizantale(e, x, y, w) {
    for (let i = y; i < y + w.length; i++) {
        e[x][i] = w[i - y]
    }
    return e
}
function writeVertical(e, x, y, w) {
    for (let i = x; i < x + w.length; i++) {
        if (e[i][y]>='a' && e[i][y]>='Z'){

        }else{
            e[i][y] = w[i - x]
        }
    }
    return e
}
// console.log(convertWordToMap(words))

function convertWordToMap(word) {
    const wordMap = new Map()
    for (let i = 0; i < word.length; i++) {
        if (wordMap.has(word[i][0])) {
            let a = wordMap.get(word[i][0])
            a.push(word[i])
            wordMap.set(word[i][0], a)
        } else {
            wordMap.set(word[i][0], [word[i]])
        }
    }
    return wordMap
}


function clRight(e, x, y) {
    let a = 0
    for (let j = y; j < e[x].length; j++) {
        if (e[x][j] != '.') {
            a = a + 1
        } else {
            break
        }
    }
    return a
}

function clLeft(e, x, y) {
    let a = 0
    for (let j = x; j < e.length; j++) {
        if (e[j][y] != '.') {
            a = a + 1
        } else {
            break
        }
    }
    return a
}