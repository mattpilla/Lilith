module.exports = {
    name: 'help',
    async execute(message, args) {
        message.channel.send('https://github.com/mattpilla/Lilith/blob/master/COMMANDS.md');
    }
};
