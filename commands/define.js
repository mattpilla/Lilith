const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { embedColor } = require('../config.json');
const { MAX_LENGTH } = require('../helpers.js');

module.exports = {
    name: 'define',
    description: 'gives top definition of term from [Urban Dictionary](https://www.urbandictionary.com/)',
    usage: '<search term>',
    validator(args) {
        return args.length > 0;
    },
    async execute(message, args) {
        const term = args.join(' ');
        const errorMsg = `no results for \`${term}\``;
        let data;
        try {
            const res = await fetch(`http://api.urbandictionary.com/v0/define?term=${encodeURIComponent(term)}`);
            if (!res.ok) {
                return message.channel.send(errorMsg);
            }
            data = await res.json();
        } catch (e) {
            console.error(e);
            return message.channel.send(errorMsg);
        }
        if (!data.list || !data.list.length) {
            return message.channel.send(errorMsg);
        }
        const result = data.list[0];
        let definition = result.definition;
        if (definition.length > MAX_LENGTH) {
            definition = `${definition.substr(0, MAX_LENGTH - 3)}...`;
        }
        const embed = new MessageEmbed()
            .setTitle(result.word)
            .setURL(result.permalink)
            .setDescription(definition)
            .addField('Example', `*${result.example}*`)
            .setFooter(`👍${result.thumbs_up} 👎${result.thumbs_down}`)
            .setColor(embedColor);
        message.channel.send(embed);
    }
};
