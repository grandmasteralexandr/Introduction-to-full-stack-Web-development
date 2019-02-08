/* Event listeners */
const task1Button = document.getElementsByName("task1-button")[0];
task1Button.addEventListener("click", calculateSum);

/* Task 1 */
function calculateSum() {
    const form = document.getElementsByName("task1-form")[0];
    const formInputs = form.getElementsByClassName("form__input");
    let firstNumber = formInputs[0].value;
    let secondNumber = formInputs[1].value;

    if (isNumber(firstNumber) && isNumber(secondNumber)) {
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

function isNumber(number) {
    return number.match("^-{0,1}\\d+$");
}

