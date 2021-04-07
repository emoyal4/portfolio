'use strict'



function printBoard(board, selector) {

  var ghostIdx = 0;

  var strHTML = '<table border="0"><tbody>';

  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>';

    for (var j = 0; j < board[0].length; j++) {
      var cell = board[i][j];

      var cellImg = '';

      if (cell === '😷') cellImg = pacmanImg
      if (cell === '⬜') cellImg = '⬜'
      if (cell === ' ') cellImg = ' '
      if (cell === '.') cellImg = foodImg
      if (cell === '@') cellImg = superFoodImg
      if (cell === '&#9781') {

        cellImg = gGhosts[ghostIdx].img
        ghostIdx++
      }

      var className = `cell cell${i}-${j}`

      strHTML += `<td class="${className}">${cellImg}</td>`
    }

    strHTML += '</tr>'
  }

  strHTML += '</tbody></table>';

  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

function renderCell(location, value) {
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);

  elCell.innerHTML = value;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getSelector(pos) {
  return `.cell${pos.i}-${pos.j}`
}

function getNextLocation(eventKeyboard) {
  var className = ''

  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  }
  switch (eventKeyboard.code) {
    case 'ArrowUp':
      nextLocation.i--
      className = 'face-up'
      break;

    case 'ArrowDown':
      nextLocation.i++
      className = 'face-down'
      break;

    case 'ArrowLeft':
      nextLocation.j--
      className = 'face-left'
      break;

    case 'ArrowRight':
      nextLocation.j++
      className = 'face-right'
      break;

    default:
      return null
  }
  var strHTML = `<img class="icon pacmen ${className}" src="./img/pacmen.png">`

  return [nextLocation, strHTML];
}
