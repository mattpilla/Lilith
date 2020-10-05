const { playSound } = require('../helpers.js');

module.exports = {
    name: 'join',
    guildOnly: true,
    exact: true,
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        if (voiceChannel) {
            const connection = await voiceChannel.join();
            playSound('audio/entrance.ogg', connection);
        } else {
            message.channel.send('you\'re not in a voice channel. join what? lol');
        }
    }
};