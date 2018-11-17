class Users {

    constructor() {
        this.persons = [];
    }

    addPerson(id, userName, room) {
        let person = { id, userName, room };

        this.persons.push(person);
        return this.persons;
    }

    getPersonById(id) {

        let person = this.persons.filter(per => per.id === id)[0];
        return person;
    }

    getAllPersons() {
        return this.persons;
    }

    getPersonsByRoom(room) {
        let personOnRoom = this.persons.filter(per => per.room === room);
        return personOnRoom;
    }

    removePerson(id) {

        let personRemove = this.getPersonById(id);
        this.persons = this.persons.filter(per => per.id !== id);
        return personRemove;
    }
}

module.exports = {
    Users
}