const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { embedColor } = require('../config.json');
const { openWeatherMapToken } = require('../auth.json');

module.exports = {
    name: 'weather',
    usage: '<US zip code>',
    examples: [
        '14127'
    ],
    validator(args) {
        return args.length === 1 && /^\d{5}$/.test(args[0]);
    },
    async execute(message, args) {
        if (!openWeatherMapToken) {
            return message.channel.send('i don\'t have an api token so i can\'t get the weather');
        }
        const errorMsg = 'invalid zip. probably';
        let data;
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${args[0]}&units=imperial&appid=${openWeatherMapToken}`);
            if (!res.ok) {
                return message.channel.send(errorMsg);
            }
            data = await res.json();
        } catch (e) {
            console.error(e);
            return message.channel.send('something\'s wrong. probably with the api');
        }
        if (data.cod !== 200) {
            return message.channel.send(errorMsg);
        }
        const embed = new MessageEmbed()
            .setTitle(`\`${args[0]}\`  ${data.name}`)
            .setDescription(`**${Math.round(data.main.temp)}°F** *(Feels Like: **${Math.round(data.main.feels_like)}°**)*`)
            .setThumbnail(`https://openweathermap.org/img/w/${data.weather[0].icon}.png`)
            .addField('Humidity', `${data.main.humidity}%`, true)
            .addField('Wind', `${Math.round(data.wind.speed)}mph`, true)
            .addField('High/Low', `${Math.round(data.main.temp_max)}°/${Math.round(data.main.temp_min)}°`, true)
            .setFooter(data.weather[0].description)
            .setColor(embedColor);
        message.channel.send(embed);
    }
};
