const { playSound } = require('../helpers.js');

module.exports = {
    name: 'join',
    description: 'joins your current voice channel and plays a sound clip',
    guildOnly: true,
    exact: true,
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        if (voiceChannel) {
            try {
                const connection = await voiceChannel.join();
                playSound('audio/entrance.ogg', connection);
            } catch (e) {
                message.channel.send('i can\'t join for some reason');
            }
        } else {
            message.channel.send('you\'re not in a voice channel. join what? lol');
        }
    }
};
