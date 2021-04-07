'use strict';

var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);
$('.btn-restart').hide().click(onRestartGame)

function init() {
  createQuestsTree();
}

function onStartGuessing() {
  $('.game-start').hide()
  $('.btn-restart').hide()
  renderQuest();
  $('.quest').show()
}

function renderQuest() {
  $('.quest').show();
  var currQuest = getCurrQuest()
  $('.quest h2').text(currQuest.txt)
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      $('h2.quest').text('Yes, I knew it!')
      renderRestartBtn()

    } else {
      $('.quest').hide()
      $('.new-quest').show()
    }
  } else {
    gLastRes = res
    moveToNextQuest(res);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  addGuess(newGuess, newQuest, gLastRes)
  $('#newGuess').val('');
  $('#newQuest').val('');

  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.btn-restart').hide()
  $('.quest .btn').show()
  $('.quest').hide();
  $('.game-start').show();
  gLastRes = null;
  reSetGame();
}


function renderRestartBtn(){
  $('.quest .btn').hide()
  $('.btn-restart').show().click(onRestartGame)


}
