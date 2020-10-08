const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { embedColor } = require('../config.json');

// replace dashes with spaces and capitalize the first letter of each word
const formatName = str => {
    str = str.replace(/-/g, ' ');
    return str.replace(/\b\w/g, l => l.toUpperCase());
};

// friendlier stat names
const statNames = {
    hp: 'HP',
    attack: 'Atk',
    defense: 'Def',
    'special-attack': 'SpA',
    'special-defense': 'SpD',
    speed: 'Spe'
};

module.exports = {
    name: 'poke',
    usage: '<Pokémon name or number>',
    examples: [
        'bulbasaur',
        '1'
    ],
    validator(args) {
        return args.length === 1;
    },
    async execute(message, args) {
        let data;
        try {
            const res = await fetch(`http://pokeapi.co/api/v2/pokemon/${args[0].toLowerCase()}`);
            if (!res.ok) {
                return message.channel.send(`no data for \`${args[0]}\``);
            }
            data = await res.json();
        } catch (e) {
            console.error(e);
            return message.channel.send('PokéAPI didn\'t like that, so i got nothin');
        }
        const statString = data.stats.map(stat => `**${statNames[stat.stat.name]}**: ${stat.base_stat}`).join(', ');
        const typeField = {
            name: `Type${data.types.length === 1 ? '' : 's'}`,
            value: data.types.map(type => formatName(type.type.name)).join(', '),
            inline: true
        };
        const abilityField = {
            name: `Abilit${data.abilities.length === 1 ? 'y' : 'ies'}`,
            value: data.abilities.map(ability => formatName(ability.ability.name)).join(', '),
            inline: true
        };
        const embed = new MessageEmbed()
            .setTitle(`\`#${data.id}\` ${formatName(data.name)}`)
            .setDescription(statString)
            .setThumbnail(data.sprites.front_shiny)
            .addFields([typeField, abilityField])
            .setImage(data.sprites.front_default)
            .setColor(embedColor);
        message.channel.send(embed);
    }
};
