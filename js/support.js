var documentWidth = window.screen.availWidth
var gridContainerWidth = 0.92 * documentWidth
var cellSideLength = 0.18 * documentWidth
var cellSpace = 0.04 * documentWidth
if (documentWidth > 500) {
    gridContainerWidth = 500
    cellSideLength = 100
    cellSpace = 20
}

function getLeft(i) {
    return (cellSideLength + cellSpace) * i + cellSpace
}

function getBgc(number) {
    switch (number) {
        case 2: return "#eee4da"; break;
        case 4: return "#ede0c8"; break;
        case 8: return "#f2b179"; break;
        case 16: return "#f59563"; break;
        case 32: return "#f67c5f"; break;
        case 64: return "#f65e3b"; break;
        case 128: return "#edcf72"; break;
        case 256: return "#edcc61"; break;
        case 512: return "#9c0"; break;
        case 1024: return "#33b5e5"; break;
        case 2048: return "#09c"; break;
        case 4096: return "#a6c"; break;
        case 8192: return "#93c"; break;
    }

    return "black";
}

function getColor(number) {
    if (number <= 4)
        return "#776e65";

    return "white";
}

function nospace(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false
            }
        }
    }
    return true
}
function isMoveLeft(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                return true
            }
        }
    }
    return false
}

function noBlockLeft(row, col, j, board) {
    for (let i = col + 1; i < j; i++) {
        if (board[row][i] != 0) {
            return false
        }

    }
    return true
}

function isMoveRight(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
                return true
            }
        }
    }
    return false
}

// function noBlockRight(row, col, j, board) {
//     for (let i = col - 1; i > j; i--) {
//         if (board[row][i] != 0) {
//             return false
//         }

//     }
//     return true
// }

function isMoveUp(board) {
    for (let j = 0; j < 4; j++) {
        for (let i = 1; i < 4; i++) {
            if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
                return true
            }
        }
    }
    return false
}

function noBlockUp(col, row1, row2, board) {
    for (let i = row1 + 1; i < row2; i++) {
        if (board[i][col] != 0) {
            return false
        }

    }
    return true
}

function isMoveDown(board) {
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 3; i++) {
            if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                return true
            }
        }
    }
    return false
}

// function noBlockDown(i, k, j, board) {
//     for (let l = k - 1; l > i; l--) {
//         if (board[l][j] != 0) {
//             return false
//         }

//     }
//     return true
// }

function noMove(board) {
    if (isMoveLeft(board) || isMoveDown(board) || isMoveUp(board) || isMoveDown(board)) {
        return false
    }
    return true
}

function isConflig(i, j, conflig) {
    if (conflig[i][j])
        return false

    return true
}

function hasSpace(board) {
    var arr = []
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] == 0)
                arr.push([i, j])
        }
    }
    return arr
}

