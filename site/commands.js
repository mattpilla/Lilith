commands = [
    {
        "name": "define",
        "description": "Gives top definition of term from [Urban Dictionary](https://www.urbandictionary.com/)",
        "usage": "<search term>"
    },
    {
        "name": "gameclear",
        "description": "deletes the role given by `.gameon` from the server",
        "guildOnly": true,
        "adminOnly": true,
        "exact": true
    },
    {
        "name": "gameoff",
        "description": "removes the role given by `.gameon` from the user",
        "guildOnly": true,
        "exact": true
    },
    {
        "name": "gameon",
        "description": "gives user role specified by `gameRoleName` in `config.json` (and creates it if it doesn't exist)",
        "guildOnly": true,
        "exact": true
    },
    {
        "name": "help",
        "description": "links to this page"
    },
    {
        "name": "inspiration",
        "description": "posts an image generated from [InspiroBot](http://inspirobot.me)",
        "exact": true
    },
    {
        "name": "join",
        "description": "joins your current voice channel and plays a sound clip",
        "guildOnly": true,
        "exact": true
    },
    {
        "name": "leave",
        "description": "plays a sound clip then exits voice",
        "guildOnly": true,
        "exact": true
    },
    {
        "name": "poke",
        "description": "gives types, abilities, stats, and sprite of Pokémon, using [PokéAPI](https://pokeapi.co/)",
        "usage": "<Pokémon name or number>",
        "examples": [
            "bulbasaur",
            "1"
        ]
    },
    {
        "name": "random",
        "description": "gives a random number up to and including the given int",
        "usage": "<positive integer greater than 1>",
        "examples": [
            "6"
        ]
    },
    {
        "name": "restart",
        "description": "restarts the bot",
        "adminOnly": true,
        "exact": true
    },
    {
        "name": "roulette",
        "description": "play russian roulette without the threat of actually dying",
        "guildOnly": true,
        "exact": true,
        "subcommands": [
            {
                "name": "shoot",
                "description": "when the game is active, this fires a shot. don't die!"
            }
        ]
    },
    {
        "name": "stop",
        "description": "stops the currently playing audio",
        "guildOnly": true,
        "exact": true
    },
    {
        "name": "update",
        "description": "updates the bot with latest changes and restarts (if [running on a server](/README.md#running-on-a-server))",
        "adminOnly": true,
        "exact": true
    },
    {
        "name": "weather",
        "description": "if API key in `auth.json`, gives current weather data for given zip code, using [OpenWeather](https://openweathermap.org/)",
        "usage": "<US zip code>",
        "examples": [
            "14127"
        ]
    },
    {
        "name": "yt",
        "description": "plays the audio of the given youtube video",
        "guildOnly": true,
        "usage": "<url of youtube video>"
    }
];