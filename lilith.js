const fs = require('fs');
const Discord = require('discord.js');
const { token } = require('./auth.json');
const { prefix, voiceChannels } = require('./config.json');
const { getConnection, isAdmin, playSound } = require('./helpers.js');

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
        if (command.adminOnly && !isAdmin(message.author.id)) {
            return message.channel.send('can\'t let you do that'); // exit if user isn't authorized to run command
        }
        if (command.exact && args.length) {
            return; // exit if command expects no args but args are given
        }
        // validate that the command was used correctly. if not, show usage and/or examples
        if (typeof command.validator === 'function' && !command.validator(args)) {
            let reply = '';
            if (command.usage) {
                reply = `usage: \`${prefix + commandName} ${command.usage}\``;
            }
            const examples = command.examples;
            if (examples) {
                if (reply && examples.length) {
                    reply += '\n';
                }
                for (let i = 0; i < examples.length; i++) {
                    if (!i) {
                        reply += 'ex: ';
                    } else {
                        reply += ' or ';
                    }
                    reply += `\`${prefix + commandName} ${examples[i]}\``;
                }
            }
            return reply ? message.channel.send(reply) : null;
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
        return playSound(`audio/themes/${current.member.id}.mp3`, connection);
    }
    // play "bye" sound clip if someone leaves bot's channel
    connection = getConnection(old.channelID, client);
    if (connection) {
        playSound('audio/bye.ogg', connection);
    }
});

client.once('ready', () => {
    if (voiceChannels) {
        voiceChannels.forEach(channel => {
            client.channels.fetch(channel).then(channel => channel.join());
        });
    }
    console.log('hiya :)');
});

client.login(token);

// generic error safeguards to prevent crashes
process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
process.on('uncaughtException', error => console.error('Uncaught Exception', error));
