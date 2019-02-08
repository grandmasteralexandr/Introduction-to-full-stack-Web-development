/* Event listeners */
const task1Button = document.getElementsByName("task1-button")[0];
task1Button.addEventListener("click", calculateSum);

/* Task 1 */
function calculateSum() {
    if (checkInputs()) {
        alert("test");
    }

    function checkInputs() {
        const form = document.getElementsByName("task1-form")[0];
        const formInputs = form.getElementsByClassName("form__input");
        for (let input of formInputs) {
            if (!Number.isInteger(Number.parseInt(input.value))) {
                alert("Input must be a number");
                return false;
            }
        }
        return true;
    }
}

