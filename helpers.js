const fs = require('fs');
const { NodeHtmlMarkdown } = require('node-html-markdown');
const { owner, volume } = require('./config.json');

// max length of discord embed description
const MAX_DESCRIPTION_LENGTH = 4096;

// converts "TEXT_LIKE_THIS" to "Text Like This"
// can pass in exceptions like "TV" to ignore
exports.capitalizeText = (str, exceptions = [], fallback = '(unknown)') => {
    if (!str) {
        return fallback;
    }
    return str.split('_').map(w => {
        if (exceptions.includes(w)) {
            return w;
        }
        return w[0].toUpperCase() + w.substr(1).toLowerCase();
    }).join(' ');
};

// instance to translate html into markdown
exports.htmlToMarkdown = new NodeHtmlMarkdown();

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

// truncates MessageEmbed description if it's too long
exports.truncateDescription = description => description.length > MAX_DESCRIPTION_LENGTH ? `${description.substr(0, MAX_DESCRIPTION_LENGTH - 3)}...` : description;
