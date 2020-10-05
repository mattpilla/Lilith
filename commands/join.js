const { playSound } = require('../helpers.js');

module.exports = {
    name: 'join',
    exact: true,
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        if (voiceChannel) {
            const connection = await voiceChannel.join();
            playSound('audio/entrance.wav', connection);
        } else {
            message.channel.send('you\'re not in a voice channel. join what? lol');
        }
    }
};
