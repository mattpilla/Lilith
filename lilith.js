const fs = require('fs');
const Discord = require('discord.js');
const { token, prefix } = require('./config.json');
const { getConnection, playSound } = require('./helpers.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands')
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    });

client.on('message', message => {
    // ignore bot messages
    if (message.author.bot) {
        return;
    }
    const text = message.content;
    if (text.startsWith(prefix)) {
        const args = text.slice(prefix.length).split(/\s+/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName);
        if (!command) {
            return; // exit if command doesn't exist
        }
        if (command.guildOnly && message.channel.type === 'dm') {
            return message.reply('this command doesn\'t work in DMs'); // exit if command is guild-only but executed in a DM
        }
        if (command.exact && args.length) {
            return; // exit if command expects no args but args are given
        }
        try {
            command.execute(message, args);
        } catch (e) {
            console.error(e);
        }
    } else if (text === 'hey') {
        message.channel.send('hiya :)');
    }
});

client.on('voiceStateUpdate', (old, current) => {
    // ignore if self, or if it's not someone changing channels
    if (old.id === client.user.id || old.channelID === current.channelID) {
        return;
    }
    // play entrance theme if someone joins bot's channel
    let connection = getConnection(current.channelID, client);
    if (connection) {
        playSound(`audio/themes/${current.member.id}.mp3`, connection);
        return;
    }
    // play "bye" sound clip if someone leaves bot's channel
    connection = getConnection(old.channelID, client);
    if (connection) {
        playSound('audio/bye.ogg', connection);
    }
});

client.once('ready', () => {
    console.log('hiya :)');
});

client.login(token);

// generic error safeguards to prevent crashes
process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
process.on('uncaughtException', error => console.error('Uncaught Exception', error));
