const form = document.querySelector('.form');
const messageInput = document.querySelector('.message__input');
const chat = document.querySelector('.chat-area');
const smileEmoji = '<img src="img/emoji/smile.png" class="emoji">';
const sadEmoji = '<img src="img/emoji/sad.png" class="emoji">';

if (form) {
    form.addEventListener('submit', sendMessage);
    printMessage();
    setInterval(printMessage, 1000);
}

function sendMessage() {
    event.preventDefault();
    const message = messageInput.value;
    messageInput.value = '';

    if (message) {
        $.post(
            'app/addMessage.php',
            {
                message: message,
                time: Date.now()
            },
            (response) => {
                if (response !== 'ok') {
                    window.location.href = '500.html';
                }
            }
        );
        printMessage();
    }
}

function printMessage() {
    $.post(
        'app/getMessages.php',
        (response) => {
            response = JSON.parse(response);

            if (typeof response != 'object') {
                window.location.href = '500.html';
                return;
            }

            let messages = '';

            for (let message in response) {
                const time = new Date(Number(message)).toTimeString().split(' ')[0];
                messages += '<p>[' + time + '] <b>' + response[message][1] + ':</b> ' + response[message][0] + '</p>';
            }

            messages = messages.replace(/:\)/g, smileEmoji);
            messages = messages.replace(/:\(/g, sadEmoji);
            const isNeedScroll = chat.scrollTop + chat.offsetHeight === chat.scrollHeight;
            chat.innerHTML = messages;

            if (isNeedScroll) {
                chat.scrollTop = chat.scrollHeight;
            }
        }
    );
}
