const loginForm = document.querySelector(".login-form");

if (loginForm) {
    loginForm.addEventListener("submit", checkForm);
}

/**
 * Validate form and print error or redirect to another page
 */
function checkForm() {
    event.preventDefault();
    $('.error-message').remove();

    const username = $('#username');
    const pass = $('#pass');

    $.post(
        'app/loginValidation.php',
        {
            username: username.val(),
            pass: pass.val()
        },
        (response) => {

            if (response === 'ok') {
                window.location.href = 'index.php';
                return;
            }

            if (response === 'db error') {
                window.location.href = '500.html';
                return;
            }

            response = JSON.parse(response);

            if (response.username) {
                username.before(`<p class="error-message">${response.username}</p>`);
            }

            if (response.pass) {
                pass.before(`<p class="error-message">${response.pass}</p>`);
            }
        }
    );
}
