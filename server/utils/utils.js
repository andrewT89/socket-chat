const createMessage = (userName, message) => {

    return {
        userName,
        message,
        date: new Date().getTime()
    };
}

module.exports = {
    createMessage
}