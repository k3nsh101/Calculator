const btn_values = document.querySelectorAll(".btn");
const btn_operators = document.querySelectorAll(".btn_operators");
const btn_equals = document.querySelector(".btn_equals");
const screen_input = document.querySelector(".screen_input");
const screen_output = document.querySelector(".screen_output");
const btn_clear = document.querySelector(".btn_clear");
const btn_delete = document.querySelector(".btn_delete");

let display_value = '';

btn_clear.addEventListener("click", () => {
    display_value = '';
    screen_input.textContent = display_value;
    screen_output.textContent = display_value;
})

btn_delete.addEventListener("click", () => {
    if (display_value.slice(-2, -1) == ' '){
        display_value = display_value.slice(0, -2);
    }
    else {
        display_value = display_value.slice(0, -1);
    }
    screen_input.textContent = display_value;
})

btn_values.forEach((key) => {
    key.addEventListener("click", (event) => {
        display_value += event.target.textContent;
        screen_input.textContent = display_value;
    })
})

btn_operators.forEach((key) => {
    key.addEventListener("click", (event) => {
        display_value += ` ${event.target.textContent} `;
        screen_input.textContent = display_value;
    })
})

btn_equals.addEventListener("click", () => {
    let post_fix = infix_to_postfix(screen_input.textContent);
    console.log(post_fix)
    let solution = evaluate_postfix(post_fix);
    screen_output.textContent = solution;
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

function power(num1, num2){
    return num1 ** num2;
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
        case '^':
            return power(num1, num2);
    }
}


function get_precedance(operator){
    // setting the precedance values for mathematical operators
    if (operator == '+') {
        return 1;
    }
    else if (operator == '-'){
        return 2;
    }
    else if (operator == '*') {
        return 3; 
    }
    else if (operator == '/'){
        return 4;
    }
    else if (operator == '^'){
        return 5;
    }
    else return 0;
}

function infix_to_postfix(expression){
    // this function converts the string in the normal input form
    // to post fix form. This eases the evaluation of the
    // mathematical expression given in the display
    const operators = ['(', ')', '^', '+', '-', '*', '/']
    let post_fix = []
    let stack = []
    let equation = expression.split(" ");
    equation = Array.from(equation.filter(Boolean));

    for (let character of equation){
        if (operators.includes(character)){
            if (get_precedance(character) < get_precedance(stack.slice(-1))){
                while (get_precedance(stack.slice(-1)) > get_precedance(character)){
                    post_fix.push(stack.pop());
                }
                stack.push(character);
            }
            else {
                stack.push(character);
            }
        }
        else {
            post_fix.push(character);
        }
    }
    while (stack.length != 0){
        post_fix.push(stack.pop());
    }
    return post_fix;
}

function evaluate_postfix(post_fix_expression){
    // evaluate the post fix expression and solve the expression
    let result = post_fix_expression;
    const operators = ['(', ')', '^', '+', '-', '*', '/']

    while (result.length > 1){
        for (let i = 0; i < result.length; i++){
            if (operators.includes(result[i])){
                let temp_result = operate(parseFloat(result[i-2]), result[i], parseFloat(result[i-1]));
                result.splice(i-2,3,temp_result);
            }
        }
    }
    return result;
}