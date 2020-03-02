function showNumAnimate(num, x, y) {
    $('#number-cell-' + x + '-' + y).css({
        color: getColor(num),
        'background-color': getBgc(num),
    })
    $('#number-cell-' + x + '-' + y).children('span').text(num)
    $('#number-cell-' + x + '-' + y).animate({
        width: cellSideLength,
        height: cellSideLength
    }, 50)
}

function showLeftAnnimate(toX, toY, fromX, fromY) {
    $('#number-cell-' + fromX + '-' + fromY).animate({
        left: getLeft(toY),
        top: getLeft(toX)
    }, 200)
}
var timer = null
function showScore(score, step) {
    var i = 0
    clearInterval(timer)
    timer = setInterval(function () {
        if (i >= step) {
            clearInterval(timer)
            return true
        }
        score += 1
        $('#score').text(score)
        i++
    }, 20);
}
