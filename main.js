const { Client, IntentsBitField, Collection, PermissionsBitField } = require("discord.js");
const client = new Client({intents: new IntentsBitField(3276799)});
const loadComments = require("./loader/loadComments");
const add = require ('./commands/utils/add');
const generateTop3 = require('./commands/utils/top3');
const resetAll = require('./commands/utils/resetAll');
const viewAll = require('./commands/utils/viewAll');
const generateTop = require('./commands/utils/top');
const { addCommand, subtractCommand, resetCommand, viewCommand} = require('./commands/utils/redside');
const { addUser, sousUser, viewUser } = require ('./commands/utils/user');
const dotenv = require("dotenv");
const { name } = require("./commands/utils/add");
const prefix = '!';
dotenv.config();

client.commands = new Collection();

loadComments(client);

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
//Commande !add
    if (command === 'add') {
        addCommand(message, args);
//Commande !sous
    } else if (command === 'sous') {
        subtractCommand(message, args);
//Commande !reset @user
    } else if (command === 'reset') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply("Tu n'as pas la permission d'utiliser cette commande.")
        }
        const mentionedUser = message.mentions.users.first();
        resetCommand(message, mentionedUser);
//Commande !view
    } else if (command === 'view') {
        viewCommand(message);
//Commande !ping (répond "pong")
    } else if (command=== 'ping'){
        add.run(client, message);
//Commande !top3
    } else if (command === 'top3') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply("Tu n'as pas la permission d'utiliser cette commande.")
        }
        const top3 = generateTop3();
        message.channel.send(top3);
//Commande !resetall
    } else if (command === 'resetall') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply("Tu n'as pas la permission d'utiliser cette commande.")
        }
        resetAll(message);
//Commande !viewall        
    } else if (command === 'viewall') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply("Tu n'as pas la permission d'utiliser cette commande.")
        }
        viewAll(message);
    }else if (command === 'top') {
        const top = generateTop();
        if (Array.isArray(top)) {
            message.channel.send(`Voici le top des joueurs :\n${top.join('\n')}`);
        } else {
            message.channel.send(top);
        }
    } else if (command === 'adduser') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply("Tu n'as pas la permission d'utiliser cette commande.")
        }
        const mentionedUser = message.mentions.members.first();
        const amountIndex = args.findIndex(arg => !isNaN(parseFloat(arg)));
        if (amountIndex !== -1) {
            const amount = parseFloat(args[amountIndex]);
            addUser(message, mentionedUser, amount);
        } else {
            message.reply("Veuillez spécifier un montant valide après la mention de l'utilisateur.");
        }
    } else if (command === 'soususer') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply("Tu n'as pas la permission d'utiliser cette commande.")
        }
        const mentionedUser = message.mentions.members.first();
        const amountIndex = args.findIndex(arg => !isNaN(parseFloat(arg)));
        if (amountIndex !== -1) {
            const amount = parseFloat(args[amountIndex]);
            sousUser(message, mentionedUser, amount);
        } else {
            message.reply("Veuillez spécifier un montant valide après la mention de l'utilisateur.");
        }
    } else if (command === 'viewuser') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply("Tu n'as pas la permission d'utiliser cette commande.")
        }
        const mentionedUser = message.mentions.members.first();
        viewUser(message, mentionedUser);
    }
});

client.login(process.env.TOKEN);
