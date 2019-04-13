const form = document.querySelector('.form');
const messageInput = document.querySelector('.message__input');

form.addEventListener('submit', sendMessage);

function sendMessage() {
    event.preventDefault();
    const message = messageInput.value;
    messageInput.value = '';

    if (message) {
        $.post(
            'app/addMessage.php',
            {message: message, time: Date.now()},
            checkResponse
        );
    }
}

function checkResponse(response) {
    if (response !== 'ok') {
        window.location.href = '500.html';
    }
}
