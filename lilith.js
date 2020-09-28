require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

let connection; // voice connection

const playSound = sound => {
    const dispatcher = connection.play(sound, {volume: process.env.VOLUME});
    dispatcher.on('error', console.error);
    return dispatcher;
};

client.on('message', async message => {
    const text = message.content;
    // args: array of [full text, command, everything after command]
    const args = /^([^ ]+)(?: +(.+)$)?/.exec(text);

    if (text === 'hey') {
        message.channel.send('hiya :)');
    } else if (text === '.join') {
        if (message.member.voice.channel) {
            connection = await message.member.voice.channel.join();
            playSound('audio/entrance.wav');
        } else {
            message.channel.send('you\'re not in a voice channel. join what? lol');
        }
    } else if (text === '.leave') {
        playSound('audio/exit.mp3').on('finish', () => {
            connection.disconnect();
        });
    }
});

client.once('ready', () => {
    console.log('hiya :)');
});

client.login(process.env.CLIENT_SECRET);
