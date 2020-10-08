const { gameRoleName, gameRoleColor } = require('../config.json');

module.exports = {
    name: 'gameclear',
    guildOnly: true,
    adminOnly: true,
    exact: true,
    async execute(message, args) {
        let role = message.guild.roles.cache.find(role => role.name === gameRoleName);
        if (role) {
            try {
                await role.delete();
            } catch (e) {
                console.error(e);
                return message.channel.send('idk what happened but that didn\'t work');
            }
            message.channel.send(`\`${gameRoleName}\` role deleted. see you next time!`);
        } else {
            message.channel.send(`\`${gameRoleName}\` role is already gone. tf you want me to do lol`);
        }
    }
};
