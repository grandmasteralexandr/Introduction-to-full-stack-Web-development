/* Selectors */
const TASK1_BUTTON = document.getElementsByName("task1-button")[0];
const TASK2_BUTTON_TO_TIME = document.getElementsByName("task2-button-to-time")[0];
const TASK2_BUTTON_TO_SEC = document.getElementsByName("task2-button-to-sec")[0];
const TASK3_BUTTON = document.getElementsByName("task3-button")[0];
const TASK4_BUTTON = document.getElementsByName("task4-button")[0];
const TASK5_TEXTAREA = document.getElementsByName("task5-textarea")[0];
const TASK6_BUTTON = document.getElementsByName("task6-button")[0];

/* Event listeners */
TASK1_BUTTON.addEventListener("click", calculateSum);
TASK2_BUTTON_TO_TIME.addEventListener("click", convertSecToTime);
TASK2_BUTTON_TO_SEC.addEventListener("click", convertTimeToSec);
TASK3_BUTTON.addEventListener("click", calculateDateTimeInterval);
TASK4_BUTTON.addEventListener("click", createBoard);
TASK5_TEXTAREA.addEventListener("blur", printLinks);
TASK6_BUTTON.addEventListener("click", highlightMatch);

/* REGEX Patterns */
const INTEGER = /^-?\d+$/;
const POSITIVE_INTEGER = /^\d+$/;
const TIME = /^([01]\d|2[0-3])(:[0-5]\d){2}$/;
const BOARD_SIZE = /^[1-9]\d*x[1-9]\d*$/;
const LINK = /^((http|https):\/\/)?(([a-zA-Z0-9][-_a-zA-Z0-9]{0,61}[a-zA-Z0-9])\.)+[a-zA-Z]{2,6}(\/[-._~:/?#[\]@!$&'()*+,;=a-zA-Z0-9]*)?$/;
const IP = /^((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d)$/;
const NOT_EMPTY = /.+/;

/* Task 1 */

/**
 * Calculate sum between input number that end in 2, 3 or 7
 */
function calculateSum() {
    let firstInput = document.getElementById("task1-number1");
    let secondInput = document.getElementById("task1-number2");
    let firstNumber = firstInput.value;
    let secondNumber = secondInput.value;
    let isValidFirstNumber = isMatch(firstNumber, INTEGER);
    let isValidSecondNumber = isMatch(secondNumber, INTEGER);

    removeInputErrorHighlight(firstInput);
    removeInputErrorHighlight(secondInput);
    removeErrorMessage(firstInput);
    removeMessage(TASK1_BUTTON);

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

        printMessage(TASK1_BUTTON, sum);
    } else {
        if (!isValidFirstNumber) {
            addInputErrorHighlight(firstInput);
        }

        if (!isValidSecondNumber) {
            addInputErrorHighlight(secondInput);
        }

        addErrorMessage(secondInput, "Input must be a number");
    }
}

/**
 * Check the end of the number on 2, 3 or 7
 *
 * @param number Input number
 * @returns {boolean} True if number ends in  2, 3 or 7
 */
function checkEnd(number) {
    number = number.toString();
    return number.endsWith("2", number.length) || number.endsWith("3", number.length) || number.endsWith("7", number.length);
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
    return Boolean(input.match(pattern));
}

/**
 * Add message element as child to specified element
 *
 * @param blockElement Element to which the child will be added
 * @param message Input message
 */
function printMessage(blockElement, message) {
    let messageBlock = document.createElement("span");
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
    let errorBlock = document.createElement("span");
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
    let timeInSecInput = document.getElementById("task2-number1");
    let timeInSec = timeInSecInput.value;

    removeInputErrorHighlight(timeInSecInput);
    removeErrorMessage(timeInSecInput);
    removeMessage(TASK2_BUTTON_TO_TIME);

    if (isMatch(timeInSec, POSITIVE_INTEGER)) {
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

        printMessage(TASK2_BUTTON_TO_TIME, hours + ":" + minutes + ":" + seconds);
    } else {
        addInputErrorHighlight(timeInSecInput);
        addErrorMessage(timeInSecInput, "Input must be a positive number");
    }
}

/**
 * Convert time to seconds and print it
 */
function convertTimeToSec() {
    let timeInput = document.getElementById("task2-number2");
    let time = timeInput.value;

    removeInputErrorHighlight(timeInput);
    removeErrorMessage(timeInput);
    removeMessage(TASK2_BUTTON_TO_SEC);

    if (isMatch(time, TIME)) {
        time = time.split(":");
        let result = parseInt(time[0]) * 3600 + parseInt(time[1]) * 60 + parseInt(time[2]);
        printMessage(TASK2_BUTTON_TO_SEC, result);
    } else {
        addInputErrorHighlight(timeInput);
        addErrorMessage(timeInput, "Input must be in format hh:mm:ss");
    }
}

/* Task 3 */

/**
 * Calculate interval between two dates and print it
 */
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
    removeMessage(TASK3_BUTTON);

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
            TASK3_BUTTON,
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

/**
 * Check if specified input is in datetime format
 *
 * @param input Specified input
 * @returns {boolean} True if specified input is in datetime format
 */
function isValidDateTime(input) {
    if (input.match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):[0-5]\d$/)) {
        let splitDateTime = input.split("T");
        let splitDate = splitDateTime[0].split("-");
        let lastDayInMonth = new Date(parseInt(splitDate[0]), parseInt(splitDate[1]), 0).getDate();

        if (lastDayInMonth >= parseInt(splitDate[2])) {
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
    let boardInput = document.getElementById("task4-board-size");
    let boardSize = boardInput.value;

    removeInputErrorHighlight(boardInput);
    removeErrorMessage(boardInput);

    if (isMatch(boardSize, BOARD_SIZE)) {
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
    removeElement(TASK5_TEXTAREA.parentElement.querySelector(".link-container"));

    let linkList = validateLinks(TASK5_TEXTAREA.value.split(","));
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

    TASK5_TEXTAREA.parentElement.appendChild(linkContainer);
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
            continue;
        }

        linkList[i].replace(/^https:\/\//, "");
        linkList[i].replace(/^http:\/\//, "");
    }
    return linkList;
}

/* Task 6 */

/**
 * Highlight matched element in input textarea for specified regex
 */
function highlightMatch() {
    let textareaInput = document.getElementById("task6-textarea");
    let regexInput = document.getElementById("task6-regex");
    let text = textareaInput.value;
    let regex = regexInput.value;
    let isValidText = isMatch(text, NOT_EMPTY);
    let isValidRegex = isMatch(regex, NOT_EMPTY);

    if (isValidText && isValidRegex) {
        regex = new RegExp(regex, "g");
        let highlightedText = text.replace(regex, "<mark>$&</mark>");
        removeElement(TASK6_BUTTON.parentElement.querySelector(".result-message"));
        printMessage(TASK6_BUTTON, highlightedText);
    } else {
        if (isValidText) {
            addInputErrorHighlight(textareaInput);
        }

        if (isValidRegex) {
            addInputErrorHighlight(regexInput);
        }

        addErrorMessage(textareaInput, "Fields can not be blank");
    }
}
