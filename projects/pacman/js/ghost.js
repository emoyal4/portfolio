'use strict'

const GHOST = '&#9781';
var ghostsImg = ['<img class="icon ghost" src="./img/ghost1.png"></img>', '<img class="icon ghost" src="./img/ghost2.png"></img>', '<img class="icon ghost" src="./img/ghost3.png"></img>']
var ghostFearImg = '<img class="icon ghost" src="./img/fear.png"></img>'
var gGhosts = []
var gIntervalGhosts;


function createGhost(board, img, pos) {
    var ghost = {
        location: {
            i: pos.i,
            j: pos.j
        },
        currCellContent: FOOD,
        img: img,
        isEaten: false
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    createGhost(board, ghostsImg[0], { i: 11, j: 13 })
    createGhost(board, ghostsImg[1], { i: 11, j: 14 })
    createGhost(board, ghostsImg[2], { i: 11, j: 15 })

    gIntervalGhosts = setInterval(moveGhosts, 200)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        if (ghost.isEaten) continue
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {

    var moveDiff = getMoveDiff()

    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }

    var nextCellContent = gBoard[nextLocation.i][nextLocation.j]

    if (nextCellContent === WALL || nextCellContent === GHOST || nextCellContent === SUPER_FOOD || nextCellContent === CHERRY) return;

    if (nextCellContent === PACMAN) {

        if (gPacman.isSuper) {

            killGhost(ghost)

        } else gameOver()
    }

    // get ghost off Currnt cell and place old content back into the cell
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    var currContentImg = (ghost.currCellContent === FOOD) ? foodImg : EMPTY
    renderCell(ghost.location, currContentImg)


    ghost.currCellContent = nextCellContent
    ghost.location = nextLocation
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    renderCell(ghost.location, ghost.img)
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}







