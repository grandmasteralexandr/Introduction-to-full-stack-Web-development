/* Selectors */
const task1Button = document.getElementById("task1-button");
const task2ButtonToTime = document.getElementById("task2-button-to-time");
const task2ButtonToSec = document.getElementById("task2-button-to-sec");
const task3Button = document.getElementById("task3-button");
const task4Button = document.getElementById("task4-button");
const task5Textarea = document.getElementById("task5-textarea");
const task6Button = document.getElementById("task6-button");

/* Event listeners */
task1Button.addEventListener("click", calculateSum);
task2ButtonToTime.addEventListener("click", convertSecToTime);
task2ButtonToSec.addEventListener("click", convertTimeToSec);
task3Button.addEventListener("click", calculateDateTimeInterval);
task4Button.addEventListener("click", createBoard);
task5Textarea.addEventListener("blur", printLinks);
task6Button.addEventListener("click", highlightMatch);

/* REGEX Patterns */
const INTEGER = /^-?\d{1,6}$/;
const POSITIVE_INTEGER = /^\d{1,24}$/;
const TIME = /^\d+(:[0-5]\d){2}$/;
const BOARD_SIZE = /^[1-9]\d?[xх][1-9]\d?$/;
const LINK = /^((http|https):\/\/)?(([a-zA-Z0-9][-_a-zA-Z0-9]{0,61}[a-zA-Z0-9])\.)+[a-zA-Z]{2,6}(\/[-._~:/?#[\]@!$&'()*+,;=a-zA-Z0-9]*)?$/;
const IP = /^((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d)$/;
const NOT_EMPTY = /.+/;

/* Task 1 */

/**
 * Calculate sum between input number that end in 2, 3 or 7
 */
function calculateSum() {
    const firstInput = document.getElementById("task1-number1");
    const secondInput = document.getElementById("task1-number2");
    let firstNumber = firstInput.value;
    let secondNumber = secondInput.value;
    const isValidFirstNumber = isMatch(firstNumber, INTEGER);
    const isValidSecondNumber = isMatch(secondNumber, INTEGER);

    removeInputErrorHighlight(firstInput);
    removeInputErrorHighlight(secondInput);
    removeErrorMessage(secondInput);
    removeMessage(secondInput);

    if (!isValidFirstNumber) {
        addInputErrorHighlight(firstInput);
    }

    if (!isValidSecondNumber) {
        addInputErrorHighlight(secondInput);
    }

    if (!isValidFirstNumber || !isValidSecondNumber) {
        addErrorMessage(secondInput, "Input must be a number and no more than 6 characters");
        return;
    }

    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);

    if (firstNumber > secondNumber) {
        [firstNumber, secondNumber] = [secondNumber, firstNumber]
    }

    let sum = 0;
    for (let i = firstNumber; i <= secondNumber; i++) {
        if (checkEnd(i)) {
            sum += i;
        }
    }

    printMessage(secondInput, "Sum: " + sum);
}

/**
 * Check the end of the number on 2, 3 or 7
 *
 * @param number Input number
 * @returns {boolean} True if number ends in  2, 3 or 7
 */
function checkEnd(number) {
    number = number.toString();
    return number.endsWith("2") || number.endsWith("3") || number.endsWith("7");
}

/**
 * Remove specified element
 *
 * @param element Specified element
 */
function removeElement(element) {
    if (element) {
        element.remove();
    }
}

/**
 * Check if specified input is match specified pattern
 *
 * @param input Checked input
 * @param pattern Search pattern
 * @returns {boolean} True if specified input is match specified pattern
 */
function isMatch(input, pattern) {
    return pattern.test(input);
}

/**
 * Add message element as child to specified element
 *
 * @param blockElement Element to which the child will be added
 * @param message Input message
 */
function printMessage(blockElement, message) {
    const messageBlock = document.createElement("span");
    messageBlock.classList.add("result-message");
    messageBlock.innerHTML = message;
    blockElement.parentElement.appendChild(messageBlock);
}

/**
 * Add input error class to specified input element
 *
 * @param inputElement Specified element to which the error class will be added
 */
function addInputErrorHighlight(inputElement) {
    inputElement.classList.add("error-input");
}

/**
 * Add error message element near the specified element
 *
 * @param inputElement Specified element near which the error message will be added
 * @param errorMessage Message in the error block
 */
function addErrorMessage(inputElement, errorMessage) {
    const errorBlock = document.createElement("span");
    errorBlock.classList.add("error-message");
    errorBlock.innerHTML = errorMessage;
    inputElement.parentElement.appendChild(errorBlock);
}

/**
 * Remove input error class from specified input element
 *
 * @param inputElement Specified element to which the error class will be deleted
 */
function removeInputErrorHighlight(inputElement) {
    inputElement.classList.remove("error-input");
}

/**
 * Remove error message element near the specified element
 *
 * @param inputElement Specified element near which the error message will be deleted
 */
function removeErrorMessage(inputElement) {
    removeElement(inputElement.parentElement.querySelector(".error-message"));
}

/**
 * Remove message element near the specified element
 *
 * @param inputElement Specified element near which the message will be deleted
 */
function removeMessage(inputElement) {
    removeElement(inputElement.parentElement.querySelector(".result-message"));
}

/* Task 2 */

/**
 * Convert seconds to time format and print it
 */
function convertSecToTime() {
    const timeInSecInput = document.getElementById("task2-number1");
    let timeInSec = timeInSecInput.value;

    removeErrorMessage(timeInSecInput);
    removeMessage(timeInSecInput);

    if (!isMatch(timeInSec, POSITIVE_INTEGER)) {
        addInputErrorHighlight(timeInSecInput);
        addErrorMessage(timeInSecInput, "Input must be a positive number or to big");
        return;
    }

    removeInputErrorHighlight(timeInSecInput);

    timeInSec = Number(timeInSec);
    const hours = Math.trunc(timeInSec / 3600);
    const minutes = Math.trunc(timeInSec / 60) - hours * 60;
    const seconds = timeInSec - minutes * 60 - hours * 3600;

    const checkLeadingZero = value => value < 10 ? "0" + value : value;

    printMessage(
        timeInSecInput,
        checkLeadingZero(hours) + ":" + checkLeadingZero(minutes) + ":" + checkLeadingZero(seconds)
    );
}

/**
 * Convert time to seconds and print it
 */
function convertTimeToSec() {
    const timeInput = document.getElementById("task2-number2");
    let time = timeInput.value;

    removeErrorMessage(timeInput);
    removeMessage(timeInput);

    if (!isMatch(time, TIME)) {
        addInputErrorHighlight(timeInput);
        addErrorMessage(timeInput, "Input must be in format hh:mm:ss");
        return;
    }

    removeInputErrorHighlight(timeInput);

    time = time.split(":");
    const result = Number(time[0]) * 3600 + Number(time[1]) * 60 + Number(time[2]);
    printMessage(timeInput, result);
}

/* Task 3 */

/**
 * Calculate interval between two dates and print it
 */
function calculateDateTimeInterval() {
    const firstDateTimeInput = document.getElementById("task3-date1");
    const secondDateTimeInput = document.getElementById("task3-date2");
    let firstDateTime = firstDateTimeInput.value;
    let secondDateTime = secondDateTimeInput.value;
    const isValidFirstDateTime = isValidDateTime(firstDateTime);
    const isValidSecondDateTime = isValidDateTime(secondDateTime);

    removeInputErrorHighlight(firstDateTimeInput);
    removeInputErrorHighlight(secondDateTimeInput);
    removeErrorMessage(secondDateTimeInput);
    removeMessage(secondDateTimeInput);

    if (!isValidFirstDateTime) {
        addInputErrorHighlight(firstDateTimeInput);
    }

    if (!isValidSecondDateTime) {
        addInputErrorHighlight(secondDateTimeInput);
    }

    if (!isValidFirstDateTime || !isValidSecondDateTime) {
        addErrorMessage(secondDateTimeInput, "Invalid date-time format");
        return;
    }

    firstDateTime = new Date(firstDateTime);
    secondDateTime = new Date(secondDateTime);

    if (firstDateTime.getTime() > secondDateTime.getTime()) {
        [firstDateTime, secondDateTime] = [secondDateTime, firstDateTime];
    }

    const range = new Date(secondDateTime - firstDateTime);
    const unixStartYear = 1970;

    const years = range.getUTCFullYear() - unixStartYear;
    const months = range.getUTCMonth();
    const days = range.getUTCDate() - 1;
    const hours = range.getUTCHours();
    const minutes = range.getUTCMinutes();
    const seconds = range.getUTCSeconds();

    printMessage(
        secondDateTimeInput,
        years + " year(s), " + months + " month(s), " + days + " day(s), " +
        hours + " hour(s), " + minutes + " minute(s), " + seconds + " second(s)."
    );
}

/**
 * Check if specified input is in datetime format
 *
 * @param input Specified input
 * @returns {boolean} True if specified input is in datetime format
 */
function isValidDateTime(input) {
    if (input.match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):[0-5]\d$/)) {
        const splitDateTime = input.split("T");
        const splitDate = splitDateTime[0].split("-");
        const lastDayInMonth = new Date(Number(splitDate[0]), Number(splitDate[1]), 0).getDate();

        if (lastDayInMonth >= Number(splitDate[2])) {
            return true;
        }
    }
    return false;
}

/* Task 4 */

/**
 * Create and print chess board with specified size
 */
function createBoard() {
    const boardInput = document.getElementById("task4-board-size");
    let boardSize = boardInput.value;

    removeErrorMessage(boardInput);

    if (!isMatch(boardSize, BOARD_SIZE)) {
        addInputErrorHighlight(boardInput);
        addErrorMessage(boardInput, "Invalid size or more than 99");
        return;
    }

    removeInputErrorHighlight(boardInput);

    /* Remove old board */
    const oldBoard = document.querySelector(".board-container");
    removeElement(oldBoard);

    /* Create new board */
    boardSize = boardSize.split(/[xх]/);
    const rows = boardSize[0];
    const cols = boardSize[1];
    const parent = document.querySelector(".task4");

    const boardContainer = document.createElement("div");
    boardContainer.classList.add("board-container");

    for (let row = 0; row < rows; row++) {
        const boardRow = document.createElement("div");
        boardRow.classList.add("board-row");
        boardContainer.appendChild(boardRow);

        for (let col = 0; col < cols; col++) {
            const boardCol = document.createElement("div");
            boardCol.classList.add("board-cell");

            if (isEven(row + col)) {
                boardCol.classList.add("black-cell");
            }

            boardRow.appendChild(boardCol);
        }
    }

    parent.appendChild(boardContainer);
}

/**
 * Check if input number is even
 *
 * @param number Input number
 * @returns {boolean} True if input number is even
 */
function isEven(number) {
    return number % 2 === 0;
}

/* Task 5 */

/**
 * Validate and print links and IP
 */
function printLinks() {
    removeErrorMessage(task5Textarea);
    removeElement(task5Textarea.parentElement.querySelector(".link-container"));

    if (!isMatch(task5Textarea.value, NOT_EMPTY)) {
        addInputErrorHighlight(task5Textarea);
        addErrorMessage(task5Textarea, "Input can not be blank");
        return;
    }

    removeInputErrorHighlight(task5Textarea);

    const linkList = validateLinks(task5Textarea.value.split(","));
    linkList.sort();

    const linkContainer = document.createElement("div");
    linkContainer.classList.add("link-container");
    for (let item of linkList) {
        const link = document.createElement("a");
        link.setAttribute("href", (item.match(/^http(s)?:\/\//) ? item : "//" + item));
        link.setAttribute("target", "blank");
        link.innerHTML = item.replace(/^http(s)?:\/\//, "");
        linkContainer.appendChild(link);
    }

    task5Textarea.parentElement.appendChild(linkContainer);
}

/**
 * Delete from the list everything that is not a link or IP address
 * and remove http(s):// from start of links
 *
 * @param linkList Not validated List {Array}
 * @returns {Array} Cleared list with links or/and IP addresses
 */
function validateLinks(linkList) {
    for (let i = 0; i < linkList.length; i++) {
        linkList[i] = linkList[i].trim();

        if (!(isMatch(linkList[i], LINK) || isMatch(linkList[i], IP))) {
            linkList.splice(i, 1);
            i--;
        }
    }
    return linkList;
}

/* Task 6 */

/**
 * Highlight matched element in input textarea for specified regex
 */
function highlightMatch() {
    const textareaInput = document.getElementById("task6-textarea");
    const regexInput = document.getElementById("task6-regex");
    const text = textareaInput.value;
    let regex = regexInput.value;
    const isValidText = isMatch(text, NOT_EMPTY);
    const isValidRegex = isMatch(regex, NOT_EMPTY);

    removeInputErrorHighlight(textareaInput);
    removeInputErrorHighlight(regexInput);
    removeErrorMessage(textareaInput);
    removeMessage(textareaInput);

    if (!isValidText) {
        addInputErrorHighlight(textareaInput);
    }

    if (!isValidRegex) {
        addInputErrorHighlight(regexInput);
    }

    if (!isValidText || !isValidRegex) {
        addErrorMessage(textareaInput, "Fields can not be blank");
        return;
    }

    regex = new RegExp(regex, "g");
    const highlightedText = text.replace(regex, "<mark>$&</mark>");
    removeElement(task6Button.parentElement.querySelector(".result-message"));
    printMessage(task6Button, highlightedText);
}
