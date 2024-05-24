const {userNumbers} = require('./redside')

function resetAll(message) {
    userNumbers.clear();
    return message.reply("Tous les nombres ont été réinitialisés.");
}

module.exports = resetAll;