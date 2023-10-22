commands = [
    {
        "name": "anime",
        "description": "displays information of given anime, using <a href=\"https://anilist.gitbook.io/anilist-apiv2-docs/\">AniList API</a>",
        "usage": "<search term>",
        "examples": [
            "cowboy bebop",
            "fmab"
        ]
    },
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
        "exact": false
    },
    {
        "name": "gameon",
        "description": "gives user role to signify they are available to game (and creates it if it doesn't exist)",
        "guildOnly": true,
        "exact": false
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
        "name": "manga",
        "description": "displays information of given manga, using <a href=\"https://anilist.gitbook.io/anilist-apiv2-docs/\">AniList API</a>",
        "usage": "<search term>",
        "examples": [
            "chainsaw man",
            "mha"
        ]
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
        "name": "poll",
        "description": "creates a simple poll with 2-9 options",
        "usage": "<question> <option 1> ... <option n> (separate terms by wrapping in quotes)",
        "examples": [
            "\"best color?\" \"purple\" \"teal\""
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
        "adminOnly": true,
        "exact": true
    },
    {
        "name": "weather",
        "description": "gives current weather data for given zip code, using <a href=\"https://openweathermap.org/\">OpenWeather</a>",
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
        "description": "says hi in &quot;home&quot; channels and joins &quot;home&quot; voice channels"
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
