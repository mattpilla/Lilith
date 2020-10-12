const fetch = require('node-fetch');

module.exports = {
    name: 'inspiration',
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
