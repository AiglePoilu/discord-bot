const userNumbers = new Map();
const Discord = require('discord.js');

function addCommand(message, args) {
    if (args.length < 1) {
        return message.reply('Utilise: !add [nombre]');
    }

    const num = parseFloat(args[0]);

    if (!userNumbers.has(message.author.id)) {
        userNumbers.set(message.author.id, num);
    } else {
        const currentNumber = userNumbers.get(message.author.id);
        userNumbers.set(message.author.id, currentNumber + num);
    }

    message.reply(`Tu as : ${userNumbers.get(message.author.id)} cartons`);
}

function subtractCommand(message, args) {
    if (args.length < 1) {
        return message.reply('Utilise: !sous [nombre]');
    }

    const num = parseFloat(args[0]);

    
    if (!userNumbers.has(message.author.id)) {
        return message.reply("Tu n'as rien à réduire");
    }

    const currentNumber = userNumbers.get(message.author.id);
    userNumbers.set(message.author.id, currentNumber - num);

    message.reply(`Tu as : ${userNumbers.get(message.author.id)} cartons`);
}

function resetCommand(message, mentionedUser) {
    if (!mentionedUser) {
        return message.reply('Tu as oublié de mentionner la personne !');
    }

    const userId = mentionedUser.id;
    if (!userNumbers.has(userId)) {
        return message.reply("Il n'a pas de cartons ! ");
    }


    userNumbers.delete(userId);
    message.reply(`Les cartons de ${mentionedUser} sont à 0`);
}

function viewCommand(message) {
    if (!userNumbers.has(message.author.id)) {
        return message.reply("0 carton :'(");
    }

    message.reply(`Tu as actuellement: ${userNumbers.get(message.author.id)} cartons`);
}

module.exports = { addCommand, subtractCommand, resetCommand, viewCommand, userNumbers};