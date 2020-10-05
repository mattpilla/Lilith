const { gameRoleName, gameRoleColor } = require('../config.json');

module.exports = {
    name: 'gameon',
    exact: true,
    async execute(message, args) {
        let role = message.guild.roles.cache.find(role => role.name === gameRoleName);
        if (!role) {
            try {
                role = await message.guild.roles.create({
                    data: {
                        name: gameRoleName,
                        color: gameRoleColor,
                        mentionable: true
                    }
                });
            } catch (e) {
                message.channel.send(`sorry, i can't add the \`${gameRoleName}\` role so i can't give it to you`);
                return;
            }
        } else if (message.member.roles.cache.find(role => role.name === gameRoleName)) {
            message.channel.send(`you already have the \`${gameRoleName}\` role. oh well. Game On.`);
            return;
        }
        await message.member.roles.add(role);
        message.channel.send(`\`${gameRoleName}\` role added (remove it if you change your mind). Game on.`);
    }
};
