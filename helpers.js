const { volume } = require('./config.json');

module.exports = {
    // return a voice connection based on id
    getConnection(id, client) {
        return client.voice.connections.find(connection => connection.channel.id === id);
    },

    // play a sound through voice chat
    playSound(sound, connection) {
        const dispatcher = connection.play(sound, {volume});
        dispatcher.on('error', console.error);
        return dispatcher;
    }
};
