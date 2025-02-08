function Operate(){
    //convert arrays to strings here, then
    if(!first)
        first = [0];
    
    if(!second)
        second = [0];
    
    const x = second.join("");
    const y = first.join("");   

    switch(operator){
        case "+":
            result = equations.Add(+x,+y);
            break;
        case "-":
            result = equations.Subtract(+x,+y);
            break; 
        case "*":
            result = equations.Multiply(+x,+y);
            break;
        case "/":
            result = equations.Divide(+x,+y);
            break;
        default:
            result = first.join("");
    }

    ClearAll();
    operatorSelect = false;
    switchNow = false;

    if(y == 0){
        result = "";
        HUD.textContent = "ERROR 404";
        hudClear = true;
        return;
    }

    first = String(Math.round(result * 100) / 100).split("");
    updateHUD();
    OpHUD.textContent = "=";

    result = "";
}

function ClearAll(){
    first = [];
    second = [];
    ClearHUD();
    ClearOpHUD();
    ClearMiniHUD();
    HUD.textContent = 0;
    hudClear = true;
}

function eraseInput(){
    if(operatorSelect){
        operatorSelect = false;
        switchNow = false;
        updateHUD();
        ClearOpHUD();
    } else {
        first.pop();
        updateHUD();
    }
}

function ClearHUD(){
    hudClear = false;
    HUD.textContent = "";
}

function ClearOpHUD(){
    OpHUD.textContent = ""; 
}

function ClearMiniHUD(){
    minHUD.textContent = "";
}

function updateHUD(content){
    console.log("updateHUD " + first)
    let hudContent = first.join("");
    if(first.length > 11){
        const number = first.slice(0,10);
        hudContent = number.join("") + "e+" + (first.length - 11);

        if(operatorSelect){
            hudContent = hudContent + " " + operator;
        }
        console.log(hudContent);
    }
    HUD.textContent = hudContent;
}

function updateminiHUD(value){
    let miniContent = second.join("");
    if(second.length > 11){
        const number = second.slice(0,10);
        miniContent = number.join("") + "e+" + (second.length - 11);
        console.log(miniContent);
    }
    minHUD.textContent = miniContent;
}

function addDigit(del = 1,counter = 0, digit = ""){
    if(hudClear){
        ClearHUD();
        console.log("hud cleared");
    }
    if(switchNow){
        console.log("trigger");
        switchNow = false;
        switchValue();
    }

    let index = first.length;
    
    if(first.length > 10){
        del = 1;
        index = first.length - 1;
        console.log("worked");
    }
    first.splice(index - counter, del, digit);
    updateHUD();
    console.log("First: " + first + " Second: " + second);
}

function switchValue(){
    console.log("before func: First: " + first + " Second: " + second);
    second = first.map((x) => x);
    updateminiHUD(second.join(""));
    console.log("after func: First: " + first + " Second: " + second);
    first = [];
}

function updateOper(oper){
    console.log("First: " + first + " Second: " + second);

    if(second.length > 0){
        Operate();
    }

    hudClear = true;
    operatorSelect = true;
    operator = oper;
    console.log(first);
    updateHUD(operator);
    OpHUD.textContent = operator;
    switchNow = true;
}

const equations = {
    Add: function(a,b){return a + b;},
    Subtract: function(a,b){return a - b;},
    Multiply: function(a,b){return a * b;},
    Divide: function(a,b){return a / b;}
}

let first = [];
let second = [];
let result = "";
let operator;
let hudClear = true;
let operatorSelect = false;
let switchNow = false;

const digits = document.querySelectorAll(".btns button");
const operators = document.querySelectorAll(".normal button");
const clear = document.querySelector("#clear");
const backspace = document.querySelector("#backspace");
const equals = document.querySelector('#operE');

const HUD = document.querySelector("#hud");
const OpHUD = document.querySelector("#operhud");
const minHUD = document.querySelector("#minihud");

digits.forEach((digit) => {
    digit.addEventListener("click", ()=>  addDigit(0, 0, digit.value));
});

operators.forEach((oper) => {
    oper.addEventListener("click", ()=>  updateOper(oper.value));
});

clear.addEventListener("click", ()=> ClearAll());

backspace.addEventListener("click", ()=> eraseInput());

equals.addEventListener("click", ()=> Operate());