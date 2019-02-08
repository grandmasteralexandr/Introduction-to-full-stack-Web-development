/* Event listeners */
const task1Button = document.getElementsByName("task1-button")[0];
const task2ButtonToTime = document.getElementsByName("task2-button-to-time")[0];
const task2ButtonToSec = document.getElementsByName("task2-button-to-sec")[0];

task1Button.addEventListener("click", calculateSum);
task2ButtonToTime.addEventListener("click", convertToTime);
task2ButtonToSec.addEventListener("click", convertToSec);

/* Task 1 */
function calculateSum() {
    const form = document.getElementsByName("task1-form")[0];
    const formInputs = form.getElementsByClassName("form__input");
    let firstNumber = formInputs[0].value;
    let secondNumber = formInputs[1].value;

    if (isInteger(firstNumber) && isInteger(secondNumber)) {
        if (firstNumber > secondNumber) {
            [firstNumber, secondNumber] = [secondNumber, firstNumber]
        }
        let sum = 0;
        for (let i = firstNumber; i <= secondNumber; i++) {
            if (checkEnd(i)) {
                sum += i;
            }
        }
        alert(sum);
    } else {
        alert("Input must be a number");
    }

    function checkEnd(number) {
        number = number.toString();
        return number.endsWith("2", number.length) || number.endsWith("3", number.length) || number.endsWith("7", number.length);
    }
}

function isInteger(number) {
    return number.match("^\\d+$");
}

/* Task 2 */
function convertToTime() {
    const form = document.getElementsByName("task2-form")[0];
    const formInputs = form.getElementsByClassName("form__input");
    let number = formInputs[0].value;

    if (isInteger(number)) {

    } else {
        alert("Input must be a number");
    }
}

function convertToSec() {
    const form = document.getElementsByName("task2-form")[0];
    const formInputs = form.getElementsByClassName("form__input");
    let time = formInputs[1].value;
}