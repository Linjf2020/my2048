var board = []
var socre = 0
var hasConflig = []
var startX = 0
var startY = 0
var endX = 0
var endY = 0
$(function () {
    initBoard()
    newgame()
})

function initBoard() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="grid-cell" id="grid-cell-' + i + '-' + j + '"></div>')
            $('#grid-cell-' + i + '-' + j).css('top', getLeft(i))
            $('#grid-cell-' + i + '-' + j).css('left', getLeft(j))
        }
    }
}

function initData() {
    for (let i = 0; i < 4; i++) {
        board[i] = []
        hasConflig[i] = []
        for (let j = 0; j < 4; j++) {
            board[i][j] = 0
            hasConflig[i][j] = false
        }
    }
    score = 0
    $('#score').text(score)
}
function newgame() {
    initData()
    // board = [[2048, 2, 4, 8], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    prepareForMobile()
    updateBoard()
    generateNum()
    generateNum()
}

function prepareForMobile() {
    // if (documentWidth > 500) {
    //     gridContainerWidth = 500
    //     cellSideLength = 100
    //     cellSpace = 20
    // }
    $('#grid-container').css({
        width: gridContainerWidth - 2 * cellSpace,
        height: gridContainerWidth - 2 * cellSpace,
        padding: cellSpace,
        'border-radius': 0.02 * gridContainerWidth
    })
    $('.grid-cell').css({
        width: cellSideLength,
        height: cellSideLength,
        'border-radius': 0.02 * cellSideLength
    })
}
function updateBoard() {
    $('.number-cell').remove()
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {

            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"><span></span></div>')
            $('#number-cell-' + i + '-' + j).css('top', getLeft(i))
            $('#number-cell-' + i + '-' + j).css('left', getLeft(j))
            var numberCell = $('#number-cell-' + i + '-' + j)
            if (board[i][j] == 0) {
                numberCell.css({
                    width: 0,
                    height: 0

                })
            }
            else {
                numberCell.css({
                    width: cellSideLength,
                    height: cellSideLength,
                    color: getColor(board[i][j]),
                    backgroundColor: getBgc(board[i][j])
                })
                numberCell.children('span').text(board[i][j])
                if (numberCell.children('span').width() > cellSideLength) {
                    console.log(1)
                    numberCell.children('span').css({
                        display: 'block',
                        'line-height': cellSideLength + 'px',
                        'font-size': 0.3 * cellSideLength + 'px'
                    })
                }
            }
            hasConflig[i][j] = false
        }
    }
    $('.number-cell').css({
        'line-height': cellSideLength + 'px',
        'font-size': 0.6 * cellSideLength + 'px'
    })
}

function generateNum() {
    if (nospace(board)) {
        return false
    }
    var arrSpace = hasSpace(board)
    var listNum = Number(Math.floor(Math.random() * arrSpace.length))
    var num = Math.random() > 0.5 ? 2 : 4
    var x = arrSpace[listNum][0]
    var y = arrSpace[listNum][1]
    board[x][y] = num
    showNumAnimate(num, x, y)
}

$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37: //left
            event.preventDefault()
            if (moveLeft()) {
                setTimeout('generateNum()', 210)
                setTimeout('isGameover()', 300)
            }
            break
        case 38: //up
            event.preventDefault()
            if (moveUp()) {
                setTimeout('generateNum()', 210)
                setTimeout('isGameover()', 300)
            }
            break
        case 39: //right
            event.preventDefault()
            if (moveRight()) {
                setTimeout('generateNum()', 210)
                setTimeout('isGameover()', 300)
            }
            break
        case 40: //down
            event.preventDefault()
            if (moveDown()) {
                setTimeout('generateNum()', 210)
                setTimeout('isGameover()', 300)
            }
            break
        default: break
    }
})

document.addEventListener('touchstart', function (e) {
    startX = e.touches[0].pageX
    startY = e.touches[0].pageY
})

document.addEventListener('touchend', function (e) {
    endX = e.changedTouches[0].pageX
    endY = e.changedTouches[0].pageY

    var deltaX = endX - startX
    var deltaY = endY - startY
    if (Math.abs(deltaX) < 0.3 * documentWidth && Math.abs(deltaY) < 0.3 * documentWidth)
        return true

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        //right
        if (deltaX > 0) {
            if (moveRight()) {
                setTimeout('generateNum()', 210)
                setTimeout('isGameover()', 300)
            }
        } else {
            if (moveLeft()) {
                setTimeout('generateNum()', 210)
                setTimeout('isGameover()', 300)
            }
        }
    } else {
        if (deltaY > 0) {
            if (moveDown()) {
                setTimeout('generateNum()', 210)
                setTimeout('isGameover()', 300)
            }
        } else {
            if (moveUp()) {
                setTimeout('generateNum()', 210)
                setTimeout('isGameover()', 300)
            }
        }
    }
})

function isGameover() {
    if (nospace(board) && noMove(board)) {
        Gameover()
    }

}
function Gameover() {
    alert('GameOver')
    newgame()
}
function moveLeft() {
    if (!isMoveLeft(board)) {
        return false
    }

    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (let k = 0; k < j; k++) {
                    if (board[i][k] == 0) {
                        showLeftAnnimate(i, k, i, j)
                        board[i][k] = board[i][j]
                        board[i][j] = 0
                        continue
                    }
                    else if (board[i][k] == board[i][j] && noBlockLeft(i, k, j, board) && isConflig(i, k, hasConflig)) {
                        showLeftAnnimate(i, k, i, j)
                        board[i][k] += board[i][j]
                        board[i][j] = 0
                        hasConflig[i][k] = true
                        showScore(score, board[i][k])
                        score += board[i][k]
                    }
                }
            }
        }

    }
    setTimeout("updateBoard()", 200)
    return true
}

function moveRight() {
    if (!isMoveRight(board)) {
        return false
    }

    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (let k = 3; k > j; k--) {
                    if (board[i][k] == 0) {
                        showLeftAnnimate(i, k, i, j)
                        board[i][k] = board[i][j]
                        board[i][j] = 0
                        continue
                    }
                    else if (board[i][k] == board[i][j] && noBlockLeft(i, j, k, board) && isConflig(i, k, hasConflig)) {
                        showLeftAnnimate(i, k, i, j)
                        board[i][k] += board[i][j]
                        board[i][j] = 0
                        hasConflig[i][k] = true
                        showScore(score, board[i][k])
                        score += board[i][k]
                    }
                }
            }
        }

    }
    setTimeout("updateBoard()", 200)
    return true
}

function moveUp() {
    if (!isMoveUp(board)) {
        return false
    }
    for (let j = 0; j < 4; j++) {
        for (let i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                for (let k = 0; k < i; k++) {
                    if (board[k][j] == 0) {
                        showLeftAnnimate(k, j, i, j)
                        board[k][j] = board[i][j]
                        board[i][j] = 0
                        continue
                    }
                    else if (board[k][j] == board[i][j] && noBlockUp(j, k, i, board) && isConflig(k, j, hasConflig)) {
                        showLeftAnnimate(k, j, i, j)
                        board[k][j] += board[i][j]
                        board[i][j] = 0
                        hasConflig[k][j] = true
                        showScore(score, board[k][j])
                        score += board[k][j]
                    }
                }
            }
        }
    }
    setTimeout("updateBoard()", 200)
    return true
}

function moveDown() {
    if (!isMoveDown(board)) {
        return false
    }
    for (let j = 0; j < 4; j++) {
        for (let i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (let k = 3; k > i; k--) {
                    if (board[k][j] == 0) {
                        showLeftAnnimate(k, j, i, j)
                        board[k][j] = board[i][j]
                        board[i][j] = 0
                        continue
                    }
                    else if (board[k][j] == board[i][j] && noBlockUp(j, i, k, board) && isConflig(k, j, hasConflig)) {
                        showLeftAnnimate(k, j, i, j)
                        board[k][j] += board[i][j]
                        board[i][j] = 0
                        hasConflig[k][j] = true
                        showScore(score, board[k][j])
                        score += board[k][j]
                    }
                }
            }
        }
    }
    setTimeout("updateBoard()", 200)
    return true
}



    // var x = Number(Math.floor(Math.random() * 4))
    // var y = Number(Math.floor(Math.random() * 4))
    // while (true) {
    //     if (board[x][y] == 0) {
    //         break
    //     }
    //     x = parseInt(Math.floor(Math.random() * 4))
    //     y = parseInt(Math.floor(Math.random() * 4))
    // }