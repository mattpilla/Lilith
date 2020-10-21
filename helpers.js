const fs = require('fs');
const { owner, volume } = require('./config.json');

module.exports = {
    // returns max length of discord embed description
    MAX_LENGTH: 2048,

    // return a voice connection based on id
    getConnection(id, client) {
        return client.voice.connections.find(connection => connection.channel.id === id);
    },

    // return true if user has the right permissions
    isAdmin(id) {
        return id === owner;
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
    },

    // random integer between 0 and max, inclusive
    randInt(max) {
        return Math.floor(Math.random() * max);
    }
};
