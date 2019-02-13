/* Event listeners */
const task1Button = document.getElementsByName("task1-button")[0];
const task2ButtonToTime = document.getElementsByName("task2-button-to-time")[0];
const task2ButtonToSec = document.getElementsByName("task2-button-to-sec")[0];
const task3Button = document.getElementsByName("task3-button")[0];

task1Button.addEventListener("click", calculateSum);
task2ButtonToTime.addEventListener("click", convertSecToTime);
task2ButtonToSec.addEventListener("click", convertTimeToSec);
task3Button.addEventListener("click", calculateDateTimeInterval);

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

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

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

/* Task 3 */
function calculateDateTimeInterval() {
    let firstDateTime = document.getElementById("task3-date1").value;
    let secondDateTime = document.getElementById("task3-date2").value;

    if (isValidDateTime(firstDateTime) && isValidDateTime(secondDateTime)) {
        firstDateTime = new Date(firstDateTime);
        secondDateTime = new Date(secondDateTime);

        if (firstDateTime.getTime() > secondDateTime.getTime()) {
            [firstDateTime, secondDateTime] = [secondDateTime, firstDateTime];
        }

        let years = secondDateTime.getFullYear() - firstDateTime.getFullYear();
        let months = secondDateTime.getMonth() - firstDateTime.getMonth();
        let days = secondDateTime.getDate() - firstDateTime.getDate();
        let hours = secondDateTime.getHours() - firstDateTime.getHours();
        let minutes = secondDateTime.getMinutes() - firstDateTime.getMinutes();
        let seconds = secondDateTime.getSeconds() - firstDateTime.getSeconds();

        if (months < 0) {
            years--;
            months += 12;
        }

        if (days < 0) {
            months--;
            /* Plus max days in previous month */
            days += new Date(secondDateTime.getFullYear(), secondDateTime.getMonth(), 0).getDate();
        }

        if (hours < 0) {
            days--;
            hours += 24;
        }

        if (minutes < 0) {
            hours--;
            minutes += 60;
        }

        if (seconds < 0) {
            minutes--;
            seconds += 60;
        }

        alert(
            years + " year(s), " + months + " month(s), " + days + " day(s), " +
            hours + " hour(s), " + minutes + " minute(s), " + seconds + " second(s)."
        );
    }
}

function isValidDateTime(date) {
    return true;
}
