const { randInt } = require('../helpers.js');

module.exports = {
    name: 'random',
    usage: '<positive integer greater than 1>',
    examples: ['6'],
    validator(args) {
        return args.length === 1 && Number.isInteger(+args[0]) && args[0] > 1;
    },
    execute(message, args) {
        const max = Math.floor(args[0]);
        if (max > Number.MAX_SAFE_INTEGER) {
            return message.channel.send('i could give a random number with this... but i choose not to');
        }
        const rand = randInt(max) + 1;
        message.channel.send(`random number between 1 and ${max} (inclusive): **${rand}**`);
    }
};
