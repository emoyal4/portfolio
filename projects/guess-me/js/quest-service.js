'use strict'

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var STORAGE_KEY = 'quests'

function createQuestsTree() {
    gQuestsTree = loadFromStorage(STORAGE_KEY)
    if (!gQuestsTree || gQuestsTree.length === 0) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Dudu Faruk');
        gQuestsTree.no = createQuest('Daenerys Targaryen');
        addToStorage(STORAGE_KEY, gQuestsTree)
    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest
    gCurrQuest = gCurrQuest[res]
}

function addGuess(newGuessTxt, newQuestTxt, lastRes) {
    gCurrQuest.no = createQuest(gPrevQuest[lastRes].txt)
    gCurrQuest.txt = newQuestTxt
    gCurrQuest.yes = createQuest(newGuessTxt)
    addToStorage(STORAGE_KEY, gQuestsTree)
}

function getCurrQuest() {
    return gCurrQuest
}

function reSetGame() {
    gQuestsTree = loadFromStorage(STORAGE_KEY)
    gCurrQuest = gQuestsTree
    gPrevQuest = null
}


