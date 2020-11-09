const fs = require('fs');
const { owner, volume } = require('./config.json');

// returns max length of discord embed description
exports.MAX_LENGTH = 2048;

// return a voice connection based on id
exports.getConnection = (id, client) => client.voice.connections.find(connection => connection.channel.id === id);

// return true if user has the right permissions
exports.isAdmin = id => id === owner;

// play a sound through voice chat
exports.playSound = (sound, connection) => {
    // don't play anything over youtube videos
    if (connection.dispatcher && connection.dispatcher.youtube) {
        return;
    }
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
};

// return random element of array
exports.randElement = arr => arr[this.randInt(arr.length)];

// random integer between 0 (inclusive) and max (exclusive)
exports.randInt = max => Math.floor(Math.random() * max);

// promise version of setTimeout
exports.timeoutPromise = (delay, value) => new Promise(resolve => setTimeout(resolve, delay, value));
