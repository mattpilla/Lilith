const fetch = require('node-fetch');

module.exports = {
    name: 'poke',
    usage: '<Pokémon name or number> (shiny)',
    examples: [
        '1',
        'bulbasaur',
        '1 shiny'
    ],
    test(args) {
        const len = args.length;
        return len === 1 || (len === 2 && args[1] === 'shiny');
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
        message.channel.send(data.name);
    }
};
