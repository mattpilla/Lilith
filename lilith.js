require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

const volume = process.env.VOLUME || 0.5;
const gameRoleName = process.env.GAME_ROLE_NAME || 'gamer';
const gameRoleColor = process.env.GAME_ROLE_COLOR || '#c072fe';

const playSound = (sound, connection) => {
    const dispatcher = connection.play(sound, {volume});
    dispatcher.on('error', console.error);
    return dispatcher;
};

// helper function to return a voice connection based on id
const getConnection = id => client.voice.connections.find(connection => connection.channel.id === id);

const onTextMessage = async message => {
    const text = message.content;
    // args: array of [full text, command, everything after command]
    const args = /^([^ ]+)(?: +(.+)$)?/.exec(text);
    const voiceChannel = message.member.voice.channel;

    if (text === 'hey') {
        message.channel.send('hiya :)');
    } else if (text === '.gameon') {
        let role = message.guild.roles.cache.find(role => role.name === gameRoleName);
        if (!role) {
            try {
                role = await message.guild.roles.create({
                    data: {
                        name: gameRoleName,
                        color: gameRoleColor,
                        mentionable: true
                    }
                });
            } catch (e) {
                message.channel.send(`sorry, i can't add the \`${gameRoleName}\` role so i can't give it to you`);
                return;
            }
        } else if (message.member.roles.cache.find(role => role.name === gameRoleName)) {
            message.channel.send(`you already have the \`${gameRoleName}\` role. oh well. Game On.`);
            return;
        }
        await message.member.roles.add(role);
        message.channel.send(`\`${gameRoleName}\` role added (remove it if you change your mind). Game on.`);
    } else if (text === '.gameoff') {
        const role = message.member.roles.cache.find(role => role.name === gameRoleName);
        if (role) {
            await message.member.roles.remove(role);
            message.channel.send(`\`${gameRoleName}\` role removed. you could've done this yourself though`);
        } else {
            message.channel.send(`you already don't have the \`${gameRoleName}\` role so you're good`);
        }
    } else if (text === '.join') {
        if (voiceChannel) {
            const connection = await voiceChannel.join();
            playSound('audio/entrance.wav', connection);
        } else {
            message.channel.send('you\'re not in a voice channel. join what? lol');
        }
    } else if (text === '.leave') {
        const connection = voiceChannel ? getConnection(voiceChannel.id) : null;
        if (connection) {
            playSound('audio/exit.mp3', connection).on('finish', () => {
                voiceChannel.leave();
            });
        } else {
            message.channel.send('we\'re not in a voice channel together. leave what? lol');
        }
    }
};

client.on('message', message => {
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
    let connection = getConnection(current.channelID);
    if (connection) {
        playSound(`audio/themes/${current.member.id}.mp3`, connection);
        return;
    }
    // play "bye" sound clip if someone leaves bot's channel
    connection = getConnection(old.channelID);
    if (connection) {
        playSound('audio/bye.wav', connection);
    }
});

client.once('ready', () => {
    console.log('hiya :)');
});

client.login(process.env.CLIENT_SECRET);
