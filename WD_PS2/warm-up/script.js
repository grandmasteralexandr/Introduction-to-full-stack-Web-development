/* Event listeners */
const task1Button = document.getElementsByName("task1-button")[0];
const task2ButtonToTime = document.getElementsByName("task2-button-to-time")[0];
const task2ButtonToSec = document.getElementsByName("task2-button-to-sec")[0];

task1Button.addEventListener("click", calculateSum);
task2ButtonToTime.addEventListener("click", convertSecToTime);
task2ButtonToSec.addEventListener("click", convertTimeToSec);

/* Task 1 */
function calculateSum() {
    let firstNumber = document.getElementById("task1-number1").value;
    let secondNumber = document.getElementById("task1-number2").value;

    if (isInteger(firstNumber) && isInteger(secondNumber)) {
        firstNumber = Number.parseInt(firstNumber);
        secondNumber = Number.parseInt(secondNumber);

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
    return number.match(/^-?\d+$/);
}

function isPositiveInteger(number) {
    return number.match(/^\d+$/);
}

/* Task 2 */
function convertSecToTime() {
    let timeInSec = document.getElementById("task2-number1").value;

    if (isPositiveInteger(timeInSec)) {
        timeInSec = Number.parseInt(timeInSec);
        let hours = Math.trunc(timeInSec / 3600);
        let minutes = Math.trunc(timeInSec / 60) - hours * 60;
        let seconds = timeInSec - minutes * 60 - hours * 3600;
        alert(hours + ":" + minutes + ":" + seconds);
    } else {
        alert("Input must be a positive number");
    }
}

function isValidTime(time) {
    return true;
}

function convertTimeToSec() {
    let time = document.getElementById("task2-number2").value;
    if (isValidTime(time)) {
        time = time.split(":");
        let result = Number.parseInt(time[0]) * 3600 + Number.parseInt(time[1]) * 60 + Number.parseInt(time[2]);
        alert(result);
    } else {
        alert("Input must be in format hh:mm:ss");
    }
}