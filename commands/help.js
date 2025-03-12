const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { embedColor, siteURL } = require('../config.json');

module.exports = {
    name: 'help',
    description: 'links to help webpage',
    userDescription: 'links to this page',
    execute(message, args) {
        const embed = new MessageEmbed()
            .setTitle('Lilith Help Site')
            .setURL(siteURL)
            .setDescription('command usage guide')
            .setThumbnail(`${siteURL}/avatar.png`)
            .setColor(embedColor);
        message.channel.send(embed);
    }
};
