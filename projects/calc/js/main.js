var gNum1 = 0;
var gNums1 = [];

var gNum2 = null;
var gNums2 = [];

var gRes = 0;

var elScreen = document.querySelector(".screen");
var gScreen = 0;

var isPlus = false;
var isMinus = false;
var isMulti = false;
var isDivide = false;


function addDigit(num) {

    if (gNum2 === null) {
        gNums1.push(num);
        elScreen.innerText = gNums1.join('');
    } else {
        gNums2.push(num);
        elScreen.innerText = gNums2.join('');
    }
}


function setOp(op) {
    if (op === '+') isPlus = true;
    if (op === '-') isMinus = true;
    if (op === '*') isMulti = true;
    if (op === '/') isDivide = true;
    gNum1 = arrToNum(gNums1);
    gNum2 = 0;
}


function calculate() {
    gRes = 0;
    gNum2 = arrToNum(gNums2);

    if (isPlus) {
        gRes = gNum1 + gNum2;
        isPlus = !isPlus
    }
    if (isMinus) {
        gRes = gNum1 - gNum2;
        isMinus = !isMinus
    }
    if (isMulti) {
        gRes = gNum1 * gNum2;
        isMulti = !isMulti
    }
    if (isDivide) {
        gRes = gNum1 / gNum2;
        isDivide = !isDivide
    }

    gNum1 = 0;
    gNum2 = null;
 

    elScreen = document.querySelector(".screen");
    elScreen.innerText = gRes + '';
}


function clearAll() {

    gNum1 = 0;
    gNums1 = [];

    gNum2 = null;
    gNums2 = [];

    gRes = 0;

    elScreen.innerText = '0'
    gScreen = 0;

    isPlus = false;
    isMinus = false;
    isMulti = false;
    isDivide = false;

}


function arrToNum(nums) {
    var newNum = 0;
    for (var i = 1; i <= nums.length; i++) {
        if (i === nums.length) newNum += nums[i - 1];
        else {
            newNum += 10 ** (nums.length - i) * nums[i - 1];
        }
    }
    return newNum;
}