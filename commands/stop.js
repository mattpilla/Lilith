const { getConnection } = require('../helpers.js');

module.exports = {
    name: 'stop',
    guildOnly: true,
    exact: true,
    execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        const connection = voiceChannel ? getConnection(voiceChannel.id, message.client) : null;
        if (connection) {
            const dispatcher = connection.dispatcher;
            if (dispatcher) {
                dispatcher.pause();
            }
        } else {
            message.channel.send('we\'re not in a voice channel together. stop what? lol');
        }
    }
};
