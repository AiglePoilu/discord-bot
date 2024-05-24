const {userNumbers} = require('./redside');


function addUser(message, mentionedUser, amount) {
    if (!mentionedUser) {
        return message.reply('Mentionnez l\'utilisateur auquel vous souhaitez ajouter des nombres.');
    }

    if (isNaN(amount) || amount <= 0) {
        return message.reply('Veuillez spécifier un nombre valide à ajouter.');
    }

    const userId = mentionedUser.id;
    const currentNumber = userNumbers.get(userId) || 0;
    userNumbers.set(userId, currentNumber + amount);

    message.reply(`Vous avez ajouté ${amount} cartons à ${mentionedUser}. Maintenant, tu es à ${currentNumber + amount} cartons.`);
}

function sousUser(message, mentionedUser, amount) {
    if (!mentionedUser) {
        return message.reply('Mentionnez l\'utilisateur auquel vous souhaitez soustraire des nombres.');
    }

    if (isNaN(amount) || amount <= 0) {
        return message.reply('Veuillez spécifier un nombre valide à soustraire.');
    }

    const userId = mentionedUser.id;
    const currentNumber = userNumbers.get(userId) || 0;
    if (currentNumber < amount) {
        return message.reply(`Impossible de soustraire ${amount} cartons à ${mentionedUser}. Ils n'ont que ${currentNumber} cartons.`);
    }

    userNumbers.set(userId, currentNumber - amount);
    message.reply(`Vous avez soustrait ${amount} cartons à ${mentionedUser}. Maintenant, tu es à ${currentNumber - amount} cartons.`);
}

function viewUser(message, mentionedUser) {
    if (!mentionedUser) {
        return message.reply('Mentionnez l\'utilisateur dont vous souhaitez voir les cartons.');
    }

    const userId = mentionedUser.id;
    const cartons = userNumbers.get(userId) || 0;
    
    if (cartons === undefined || cartons === null) {
        message.channel.send(`<@${userId}> n'a pas de cartons :'(`);
    } else {
        message.channel.send(`<@${userId}> a ${cartons} cartons.`);
    }
}

module.exports = { addUser, sousUser, viewUser};