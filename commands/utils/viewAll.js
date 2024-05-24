const {userNumbers} = require('./redside')

function viewAll(message) {
    let total = 0;
    userNumbers.forEach(number => {
        total += number;
    });
    if (total === 0) {
        return message.channel.send("Pas de cartons cette semaine :'(");
    }

    return message.channel.send(`Cette semaine, ${total} cartons ont été vendus ! Bravo à tous !`);
}

module.exports = viewAll;