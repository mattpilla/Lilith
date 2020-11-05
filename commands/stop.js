const { getConnection } = require('../helpers.js');

module.exports = {
    name: 'stop',
    description: 'stops the currently playing audio',
    guildOnly: true,
    exact: true,
    execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        const connection = voiceChannel ? getConnection(voiceChannel.id, message.client) : null;
        if (connection) {
            if (connection.dispatcher) {
                connection.dispatcher.destroy();
            }
        } else {
            message.channel.send('we\'re not in a voice channel together. stop what? lol');
        }
    }
};
