const { gameRoleName } = require('../config.json');

module.exports = {
    name: 'gameoff',
    description: 'removes the role given by `.gameon` from the user',
    guildOnly: true,
    exact: true,
    async execute(message, args) {
        const role = message.member.roles.cache.find(role => role.name === gameRoleName);
        if (role) {
            try {
                await message.member.roles.remove(role);
            } catch (e) {
                console.error(e);
                return message.channel.send('didn\'t work... i probably don\'t have the right permissions');
            }
            message.channel.send(`\`${gameRoleName}\` role removed`);
        } else {
            message.channel.send(`you already don't have the \`${gameRoleName}\` role so you're good`);
        }
    }
};
