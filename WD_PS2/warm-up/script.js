/* Event listeners */
const task1Button = document.getElementsByName("task1-button")[0];
const task2ButtonToTime = document.getElementsByName("task2-button-to-time")[0];
const task2ButtonToSec = document.getElementsByName("task2-button-to-sec")[0];
const task3Button = document.getElementsByName("task3-button")[0];
const task4Button = document.getElementsByName("task4-button")[0];
const task5Textarea = document.getElementsByName("task5-textarea")[0];
const task6Button = document.getElementsByName("task6-button")[0];

task1Button.addEventListener("click", calculateSum);
task2ButtonToTime.addEventListener("click", convertSecToTime);
task2ButtonToSec.addEventListener("click", convertTimeToSec);
task3Button.addEventListener("click", calculateDateTimeInterval);
task4Button.addEventListener("click", createBoard);
task5Textarea.addEventListener("blur", printLinks);
task6Button.addEventListener("click", highlightMatch);

/* Task 1 */
function calculateSum() {
    let firstInput = document.getElementById("task1-number1");
    let secondInput = document.getElementById("task1-number2");
    let firstNumber = firstInput.value;
    let secondNumber = secondInput.value;
    let isValidFirstNumber = isInteger(firstNumber);
    let isValidSecondNumber = isInteger(secondNumber);

    removeInputErrorHighlight(firstInput);
    removeInputErrorHighlight(secondInput);
    removeErrorMessage(firstInput);

    if (isValidFirstNumber && isValidSecondNumber) {

        firstNumber = parseInt(firstNumber);
        secondNumber = parseInt(secondNumber);

        if (firstNumber > secondNumber) {
            [firstNumber, secondNumber] = [secondNumber, firstNumber]
        }

        let sum = 0;
        for (let i = firstNumber; i <= secondNumber; i++) {
            if (checkEnd(i)) {
                sum += i;
            }
        }

        printMessage(task1Button, sum);
    } else {
        if (!isValidFirstNumber) {
            addInputErrorHighlight(firstInput);
        }

        if (!isValidSecondNumber) {
            addInputErrorHighlight(secondInput);
        }

        addErrorMessage(secondInput, "Input must be a number");
    }

    function checkEnd(number) {
        number = number.toString();
        return number.endsWith("2", number.length) || number.endsWith("3", number.length) || number.endsWith("7", number.length);
    }
}

function removeElement(element) {
    if (element) {
        element.remove();
    }
}

function isInteger(number) {
    return number.match(/^-?\d+$/);
}

function isPositiveInteger(number) {
    return number.match(/^\d+$/);
}

function printMessage(blockElement, message) {
    let messageBlock = document.createElement("span");
    messageBlock.classList.add("result-message");
    messageBlock.innerHTML = message;
    blockElement.parentElement.appendChild(messageBlock);
}

function addInputErrorHighlight(inputElement) {
    inputElement.classList.add("error-input");
}

function addErrorMessage(inputElement, errorMessage) {
    let errorBlock = document.createElement("span");
    errorBlock.classList.add("error-message");
    errorBlock.innerHTML = errorMessage;
    inputElement.parentElement.appendChild(errorBlock);
}

function removeInputErrorHighlight(inputElement) {
    inputElement.classList.remove("error-input");
}

function removeErrorMessage(inputElement) {
    removeElement(inputElement.parentElement.querySelector(".error-message"));
}

/* Task 2 */
function convertSecToTime() {
    let timeInSecInput = document.getElementById("task2-number1");
    let timeInSec = timeInSecInput.value;

    removeInputErrorHighlight(timeInSecInput);
    removeErrorMessage(timeInSecInput);

    if (isPositiveInteger(timeInSec)) {
        timeInSec = parseInt(timeInSec);
        let hours = Math.trunc(timeInSec / 3600);
        let minutes = Math.trunc(timeInSec / 60) - hours * 60;
        let seconds = timeInSec - minutes * 60 - hours * 3600;

        if (hours < 10) {
            hours = "0" + hours;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        printMessage(task2ButtonToTime, hours + ":" + minutes + ":" + seconds);
    } else {
        addInputErrorHighlight(timeInSecInput);
        addErrorMessage(timeInSecInput, "Input must be a positive number");
    }
}

function isValidTime(time) {
    return time.match(/^([01]\d|2[0-3])(:[0-5]\d){2}$/);
}

function convertTimeToSec() {
    let timeInput = document.getElementById("task2-number2");
    let time = timeInput.value;

    removeInputErrorHighlight(timeInput);
    removeErrorMessage(timeInput);

    if (isValidTime(time)) {
        time = time.split(":");
        let result = parseInt(time[0]) * 3600 + parseInt(time[1]) * 60 + parseInt(time[2]);
        printMessage(task2ButtonToSec, result);
    } else {
        addInputErrorHighlight(timeInput);
        addErrorMessage(timeInput, "Input must be in format hh:mm:ss");
    }
}

/* Task 3 */
function calculateDateTimeInterval() {
    let firstDateTimeInput = document.getElementById("task3-date1");
    let secondDateTimeInput = document.getElementById("task3-date2");
    let firstDateTime = firstDateTimeInput.value;
    let secondDateTime = secondDateTimeInput.value;
    let isValidFirstDateTime = isValidDateTime(firstDateTime);
    let isValidSecondDateTime = isValidDateTime(secondDateTime);

    removeInputErrorHighlight(firstDateTimeInput);
    removeInputErrorHighlight(secondDateTimeInput);
    removeErrorMessage(secondDateTimeInput);

    if (isValidFirstDateTime && isValidSecondDateTime) {
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

        printMessage(
            task3Button,
            years + " year(s), " + months + " month(s), " + days + " day(s), " +
            hours + " hour(s), " + minutes + " minute(s), " + seconds + " second(s)."
        );
    } else {
        if (!isValidFirstDateTime) {
            addInputErrorHighlight(firstDateTimeInput);
        }

        if (!isValidSecondDateTime) {
            addInputErrorHighlight(secondDateTimeInput);
        }

        addErrorMessage(secondDateTimeInput, "Invalid date-time format");
    }
}

function isValidDateTime(date) {
    if (date.match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):[0-5]\d$/)) {
        let splitDateTime = date.split("T");
        let splitDate = splitDateTime[0].split("-");
        let lastDayInMonth = new Date(parseInt(splitDate[0]), parseInt(splitDate[1]), 0).getDate();

        if (lastDayInMonth >= parseInt(splitDate[2])) {
            return true;
        }
    }
    return false;
}

/* Task 4 */
function createBoard() {
    let boardInput = document.getElementById("task4-board-size");
    let boardSize = boardInput.value;

    removeInputErrorHighlight(boardInput);
    removeErrorMessage(boardInput);

    if (isValidBoardSize(boardSize)) {
        /* Remove old board */
        let oldBoard = document.getElementsByClassName("board-container")[0];
        removeElement(oldBoard);

        /* Create new board */
        boardSize = boardSize.split("x");
        let rows = boardSize[0];
        let cols = boardSize[1];
        let parent = document.getElementsByName("task4-form")[0];

        let boardContainer = document.createElement("div");
        boardContainer.classList.add("board-container");

        for (let row = 0; row < rows; row++) {
            let boardRow = document.createElement("div");
            boardRow.classList.add("board-row");
            boardContainer.appendChild(boardRow);

            for (let col = 0; col < cols; col++) {
                let boardCol = document.createElement("div");
                boardCol.classList.add("board-cell");

                if (!isEven(row) && isEven(col) || isEven(row) && !isEven(col)) {
                    boardCol.classList.add("black-cell");
                }

                boardRow.appendChild(boardCol);
            }
        }

        parent.appendChild(boardContainer);
    } else {
        addInputErrorHighlight(boardInput);
        addErrorMessage(boardInput, "Invalid size");
    }

    function isValidBoardSize(boardSize) {
        return boardSize.match(/^[1-9]\d*x[1-9]\d*$/);
    }
}

function isEven(number) {
    return number % 2 === 0;
}


/* Task 5 */
function printLinks() {
    removeElement(task5Textarea.parentElement.querySelector(".link-container"));

    let linkList = validateLinks(task5Textarea.value.split(","));
    linkList.sort();

    let linkContainer = document.createElement("div");
    linkContainer.classList.add("link-container");
    for (let i = 0; i < linkList.length; i++) {
        let link = document.createElement("a");
        link.setAttribute("href", "//" + linkList[i]);
        link.setAttribute("target", "blank");
        link.innerHTML = linkList[i];
        linkContainer.appendChild(link);
    }

    task5Textarea.parentElement.appendChild(linkContainer);

    function validateLinks(linkList) {
        for (let i = 0; i < linkList.length; i++) {
            linkList[i] = linkList[i].trim();

            if (!(isLink(linkList[i]) || isIP(linkList[i]))) {
                linkList.splice(i, 1);
                continue;
            }

            linkList[i].replace(/^https:\/\//, "");
            linkList[i].replace(/^http:\/\//, "");
        }
        return linkList;
    }
}

function isLink(link) {
    return link.match(/^((http|https):\/\/)?(([a-zA-Z0-9][-_a-zA-Z0-9]{0,61}[a-zA-Z0-9])\.)+[a-zA-Z]{2,6}\/[-._~:/?#[\]@!$&'()*+,;=a-zA-Z0-9]*$/);
}

function isIP(link) {
    return link.match(/^((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d)$/);
}

/* Task 6 */
function highlightMatch() {
    let textareaInput = document.getElementById("task6-textarea");
    let regexInput = document.getElementById("task6-regex");
    let text = textareaInput.value;
    let regex = new RegExp(regexInput.value, "g");
    let highlightedText = text.replace(regex, "<mark>$&</mark>");
    removeElement(task6Button.parentElement.querySelector(".result-message"));
    printMessage(task6Button, highlightedText);
}
