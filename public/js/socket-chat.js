var socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has('userName') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesarios');
}

let user = {
    userName: params.get('userName'),
    room: params.get('room')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('enterChat', user, (response) => {
        console.log(response);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('sendMessage', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('createMessage', (mensaje) => {
    console.log('Servidor:', mensaje);
});

/**
 * Escuchar cambios de usuarios
 * salida y entrada de usuarios al chat
 */
socket.on('listPersons', (persons) => {
    console.log(persons)
});

/** messages privates */
socket.on('messagePrivate', (message) => {
    console.log('Mensaje privado:', message);
});