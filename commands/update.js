module.exports = {
    name: 'update',
    description: 'updates the bot with latest changes and restarts (if [running on a server](#running-on-a-server))',
    adminOnly: true,
    exact: true,
    execute(message, args) {
        if (process.env.NODE_ENV === 'prod') {
            require('child_process').exec('yarn update');
        } else {
            message.channel.send('this only works on prod');
        }
    }
};
