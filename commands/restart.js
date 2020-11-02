module.exports = {
    name: 'restart',
    adminOnly: true,
    exact: true,
    execute(message, args) {
        require('child_process').exec(process.env.NODE_ENV === 'prod' ? 'npm run restart' : `touch ${__filename}`);
    }
};
