const { gameRoleName } = require('../config.json');

module.exports = {
    name: 'gameoff',
    exact: true,
    async execute(message, args) {
        const role = message.member.roles.cache.find(role => role.name === gameRoleName);
        if (role) {
            await message.member.roles.remove(role);
            message.channel.send(`\`${gameRoleName}\` role removed. you could've done this yourself though`);
        } else {
            message.channel.send(`you already don't have the \`${gameRoleName}\` role so you're good`);
        }
    }
};
