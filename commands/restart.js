module.exports = {
    name: 'restart',
    description: 'restarts the bot',
    adminOnly: true,
    exact: true,
    execute(message, args) {
        require('child_process').exec(process.env.NODE_ENV === 'prod' ? 'yarn restart' : `touch ${__filename}`);
    }
};
