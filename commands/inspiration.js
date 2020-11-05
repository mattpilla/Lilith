const fetch = require('node-fetch');

module.exports = {
    name: 'inspiration',
    description: 'posts an image generated from http://inspirobot.me',
    exact: true,
    async execute(message, args) {
        const errorMsg = 'InspiroBot isn\'t working for me, sorry :(';
        try {
            const res = await fetch('http://inspirobot.me/api?generate=true');
            if (!res.ok) {
                return message.channel.send(errorMsg);
            }
            const img = await res.text();
            message.channel.send({
                files: [img]
            });
        } catch (e) {
            console.error(e);
            return message.channel.send(errorMsg);
        }
    }
};
