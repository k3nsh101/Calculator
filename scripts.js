const btn_values = document.querySelectorAll(".btn");
const btn_equals = document.querySelector(".btn_equals");
const screen_input = document.querySelector(".screen_input");
const screen_output = document.querySelector(".screen_output");
const btn_clear = document.querySelector(".btn_clear");
const btn_delete = document.querySelector(".btn_delete");

let display_value = '';

btn_values.forEach((key) => {
    key.addEventListener("click", (event) => {
        display_value += event.target.textContent;
        screen_input.textContent = display_value;
    })
})

btn_clear.addEventListener("click", () => {
    display_value = '';
    screen_input.textContent = display_value;
    screen_output.textContent = display_value;
})

btn_delete.addEventListener("click", () => {
    display_value = display_value.slice(0, -1);
    screen_input.textContent = display_value;
})

btn_equals.addEventListener("click", (event) => {
    let values = display_value.split('+');
    let num1 = parseFloat(values[0]);
    let num2 = parseFloat(values[1]);
    let operator = '+';
    let result = operate(num1, operator, num2);

    screen_output.textContent = result;
})

function add(num1, num2){
    return num1 + num2;
}

function substract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function operate(num1, operator, num2){
    switch (operator){
        case '+': 
            return add(num1, num2);

        case '-': 
            return substract(num1, num2);

        case '*': 
            return multiply(num1, num2);

        case '/': 
            return divide(num1, num2);
    }
}