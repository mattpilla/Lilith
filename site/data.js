commands = [
    {
        "name": "define",
        "description": "gives top definition of term from <a href=\"https://www.urbandictionary.com/\">Urban Dictionary</a>",
        "usage": "<search term>"
    },
    {
        "name": "gameclear",
        "description": "deletes the role given by <code>.gameon</code> from the server",
        "guildOnly": true,
        "adminOnly": true,
        "exact": true
    },
    {
        "name": "gameoff",
        "description": "removes the role given by <code>.gameon</code> from the user",
        "guildOnly": true,
        "exact": true
    },
    {
        "name": "gameon",
        "description": "gives user role to signify they are available to game (and creates it if it doesn't exist)",
        "userDescription": "gives user role to signify they are available to game (and creates it if it doesn't exist)",
        "guildOnly": true,
        "exact": true
    },
    {
        "name": "help",
        "description": "links to this page"
    },
    {
        "name": "inspiration",
        "description": "posts an image generated from <a href=\"http://inspirobot.me\">InspiroBot</a>",
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
        "description": "gives types, abilities, stats, and sprite of Pokémon, using <a href=\"https://pokeapi.co/\">PokéAPI</a>",
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
        "description": "starts a text-based game of russian roulette",
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
        "description": "updates the bot with latest changes and restarts",
        "userDescription": "updates the bot with latest changes and restarts",
        "adminOnly": true,
        "exact": true
    },
    {
        "name": "weather",
        "description": "gives current weather data for given zip code, using <a href=\"https://openweathermap.org/\">OpenWeather</a>",
        "userDescription": "gives current weather data for given zip code, using [OpenWeather](https://openweathermap.org/)",
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
extraCommands = [
    {
        "name": "hey",
        "description": "says hi"
    }
];
events = [
    {
        "name": "On bot initialize",
        "description": "says hi in &quot;home&quot; channels and joins &quot;home&quot; voice channels",
        "userDescription": "says hi in \"home\" channels and joins \"home\" voice channels"
    },
    {
        "name": "On user joining voice channel bot is in",
        "description": "plays their entrance theme, if they have one"
    },
    {
        "name": "On user leaving voice channel bot is in",
        "description": "plays a sound clip to say bye"
    }
];
