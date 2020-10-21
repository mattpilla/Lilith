const { randInt } = require('../helpers.js');

module.exports = {
    name: 'random',
    usage: '<positive integer greater than 1>',
    examples: ['6'],
    validator(args) {
        return args.length === 1 && Number.isInteger(+args[0]) && args[0] > 1;
    },
    execute(message, args) {
        const rand = randInt(args[0]) + 1;
        message.channel.send(`random number between 1 and ${args[0]} (inclusive): **${rand}**`);
    }
};
