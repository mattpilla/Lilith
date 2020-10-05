const fs = require('fs');
const { volume } = require('./config.json');

module.exports = {
    // return a voice connection based on id
    getConnection(id, client) {
        return client.voice.connections.find(connection => connection.channel.id === id);
    },

    // play a sound through voice chat
    playSound(sound, connection) {
        // if .ogg, create ReadableStream and set type to ogg/opus
        let type;
        if (sound.endsWith('.ogg')) {
            sound = fs.createReadStream(sound);
            type = 'ogg/opus';
        }
        const dispatcher = connection.play(sound, {
            type,
            volume
        });
        dispatcher.on('error', console.error);
        return dispatcher;
    }
};
