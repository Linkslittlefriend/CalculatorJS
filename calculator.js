function Operate(a,b,op){
    //convert arrays to strings here, then 
    equations
}

function ClearHUD(){
    hudClear = false;
    HUD.textContent = "";
}

function updateValue(digit = "", del = 1){
    if(hudClear)
        ClearHUD();
    first.splice(first.length, del, digit);
    HUD.textContent += digit;
}

function updateOper(oper){
    operator = oper;
    HUD.textContent += " " + oper + " ";
}

const equations = {
    Add: function(a,b){return a + b;},
    Subtract: function(a,b){return a - b;},
    Multiply: function(a,b){return a * b;},
    Divide: function(a,b){return a / b;}
}

let first = [];
let second = [];
let operator;
let hudClear = true;

let digits = document.querySelectorAll(".btns button");
let operators = document.querySelectorAll(".oper button");
let HUD = document.querySelector("#hud");

digits.forEach((digit) => {
    digit.addEventListener("click", ()=>  updateValue(digit.value, 0));
});

operators.forEach((oper) => {
    oper.addEventListener("click", ()=>  updateOper(oper.value));
});