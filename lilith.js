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

const onTextMessage = message => {
    const text = message.content;
    if (text.startsWith(prefix)) {
        const args = text.slice(prefix.length).split(/\s+/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName);
        if (!command) {
            return; // exit if command doesn't exist
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
};

client.on('message', message => {
    // ignore bot messages
    if (message.author.bot) {
        return;
    }
    // only parse text channel messages... for now
    if (message.channel.type === 'text') {
        onTextMessage(message);
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
        playSound('audio/bye.wav', connection);
    }
});

client.once('ready', () => {
    console.log('hiya :)');
});

client.login(token);
