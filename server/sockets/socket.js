const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils');

const users = new Users();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('enterChat', (data, callback) => {

        if (!data.userName || !data.room) {
            return callback({
                error: false,
                message: `El nombre/sala del usuario es necesario`
            });
        }

        client.join(data.room);

        users.addPerson(client.id, data.userName, data.room);
        client.broadcast.to(data.room).emit('listPersons', users.getPersonsByRoom(data.room));

        callback(users.getPersonsByRoom(data.room));

    });

    client.on('createMessage', (data) => {

        let person = users.getPersonById(client.id);
        let message = createMessage(person.userName, data.message);
        client.broadcast.to(person.room).emit('createMessage', message);
    });

    client.on('disconnect', () => {
        let personRemove = users.removePerson(client.id);

        client.broadcast.to(personRemove.room).emit('createMessage', createMessage(
            'Administrador',
            `${personRemove.userName} salio del chat.`
        ));
        client.broadcast.to(personRemove.room).emit('listPersons', users.getPersonsByRoom(personRemove.room));
    });

    /** messages privates */
    client.on('messagePrivate', data => {
        let person = users.getPersonById(client.id);
        client.broadcast.to(data.para).emit('messagePrivate', createMessage(person.userName, data.message));
    });
});