const { getConnection, playSound } = require('../helpers.js');

module.exports = {
    name: 'leave',
    description: 'plays a sound clip then exits voice',
    guildOnly: true,
    exact: true,
    execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        const connection = voiceChannel ? getConnection(voiceChannel.id, message.client) : null;
        if (connection) {
            playSound('audio/exit.ogg', connection).on('finish', () => {
                voiceChannel.leave();
            });
        } else {
            message.channel.send('we\'re not in a voice channel together. leave what? lol');
        }
    }
};
