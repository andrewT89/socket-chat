var socket = io();
let param = new URLSearchParams(window.location.search),
    userName = param.get('userName');

// Referencias de jQuery
const divUsuarios = $('#divUsuarios');
const divChatbox = $('#divChatbox');
const sendForm = $('#sendForm');
const txtMessage = $('#txtMessage');

function renderUsers(persons) {
    console.log(persons);

    let html = '';

    html += `<li>
                <a href="javascript:void(0)" class="active"> Chat de <span> ${param.get('room')}</span></a>
            </li>`;

    for (let i = 0; i < persons.length; i++) {
        html += `<li>
            <a data-id="${persons[i].id}" href="javascript:void(0)"><img src="../assets/images/users/1.jpg" alt="user-img" class="img-circle"> 
               <span> ${persons[i].userName} <small class="text-success">online</small></span></a>
        </li>`;
    }
    divUsuarios.html(html);
};

function renderMessages(message, uWrite) {

    let html = '',
        date = new Date(message.date),
        hour = `${date.getHours()} : ${date.getMinutes()}`,
        adminClass = 'info';

    if (message.userName === 'Administrador') {
        adminClass = 'danger';
    }

    if (uWrite) {
        html += `<li class="reverse">
        <div class="chat-content">
            <h5> ${message.userName} </h5>
            <div class="box bg-light-inverse"> ${message.message} </div>
        </div>
            <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
            <div class="chat-time"> ${hour} </div>
    </li>`;
    } else {
        html += `<li class="animated fadeIn">
        <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user"/>
            </div>
                <div class="chat-content">
                    <h5>${message.userName}</h5>
                    <div class="box bg-light-${adminClass}"> ${message.message} </div>
                </div>
        <div class="chat-time"> ${hour} </div>
    </li>`;
    }

    divChatbox.append(html);
}

function scrollBottom() {

    // selectors
    let newMessage = divChatbox.children('li:last-child');

    // heights
    let clientHeight = divChatbox.prop('clientHeight');
    let scrollTop = divChatbox.prop('scrollTop');
    let scrollHeight = divChatbox.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

// Listeners
divUsuarios.on('click', 'a', () => {
    let id = $(this).data('id');

    if (id) {
        console.log(id);
    }
});

sendForm.on('submit', (e) => {
    e.preventDefault();

    if (txtMessage.val().trim().length === 0) {
        return;
    }

    let message = txtMessage.val();
    socket.emit('createMessage', {
        userName,
        message
    }, function(message) {
        txtMessage.val('').focus();
        renderMessages(message, true);
        scrollBottom();
    });
});