'use strict'

const PACMAN = '😷';

var gPacman;

var pacmanImg = `<img class="icon pacmen" src="./img/pacmen.png">`

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false,
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return

    var nextLocationInfo = getNextLocation(ev)

    var nextLocation = nextLocationInfo[0]
    var PacmenImg = nextLocationInfo[1]

    if (!nextLocation) return

    var nextCellContent = gBoard[nextLocation.i][nextLocation.j]

    if (nextCellContent === WALL) return

    if (nextCellContent === FOOD) {
        updateScore(1)
        if (gGame.score === gFoodCount+4) victory()
    }

    if (nextCellContent === SUPER_FOOD) {
        if (gPacman.isSuper) return
        getsuperPower()
    }

    if (nextCellContent === CHERRY) {
        updateScore(10)
        gFoodCount += 10
        gCherryCount--
    }

    if (nextCellContent === GHOST) {
        if (gPacman.isSuper) {

            for (var i = 0; i < gGhosts.length; i++) {
                if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) var currGhost = gGhosts[i]
            }
            if (currGhost.currCellContent === FOOD) updateScore(1)

            killGhost(currGhost)

        } else gameOver()
    }

    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)

    gPacman.location = nextLocation

    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    renderCell(gPacman.location, PacmenImg)
}

function getsuperPower() {
    getGhostScared()
    gPacman.isSuper = true

    setTimeout(function () {
        for (var i = 0; i < gGhosts.length; i++) {
            gGhosts[i].img = ghostsImg[i]
        }
        gPacman.isSuper = false
    }, 5000);
}

function getGhostScared() {
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].img = ghostFearImg
    }
}

function killGhost(ghost) {

    ghost.isEaten = true

    ghost.currCellContent = EMPTY

    setTimeout(function () {
        ghost.isEaten = false

    }, 5500);
}

