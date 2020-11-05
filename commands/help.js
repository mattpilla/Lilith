module.exports = {
    name: 'help',
    description: 'links to this page',
    execute(message, args) {
        message.channel.send('https://github.com/mattpilla/Lilith/blob/master/COMMANDS.md');
    }
};
