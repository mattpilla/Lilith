# Commands
- `hey`: says hi

## From [commands](commands) directory
These commands are prefixed with `prefix` from `config.json` (assumed prefix of `.` here for simplicity).\
**[A]** means only the bot's admins can use this command.\
**[S]** means the command can only be used in a server (not in DMs).\
Indented commands are related to the command above it.\
Refer to the README in the [commands](commands) directory for more info.
- `.define <search term>`: Gives top definition of term from [Urban Dictionary](https://www.urbandictionary.com/)
- `.gameclear`: **[AS]** deletes the role given by `.gameon` from the server
- `.gameoff`: **[S]** removes the role given by `.gameon` from the user
- `.gameon`: **[S]** gives user role specified by `gameRoleName` in `config.json` (and creates it if it doesn't exist)
- `.help`: links to this page
- `.inspiration`: posts an image generated from [InspiroBot](http://inspirobot.me)
- `.join`: **[S]** joins your current voice channel and plays a sound clip
- `.leave`: **[S]** plays a sound clip then exits voice
- `.poke <Pokémon name or number>`: gives types, abilities, stats, and sprite of Pokémon, using [PokéAPI](https://pokeapi.co/)
- `.random <positive integer greater than 1>`: gives a random number up to and including the given int
- `.restart`: **[A]** restarts the bot
- `.roulette`: **[S]** play russian roulette without the threat of actually dying
    - `shoot`: when the game is active, this fires a shot. don't die!
- `.stop`: **[S]** stops the currently playing audio
- `.update`: **[A]** updates the bot with latest changes and restarts (if [running on a server](/README.md#running-on-a-server))
- `.weather <US zip code>`: if API key in `auth.json`, gives current weather data for given zip code, using [OpenWeather](https://openweathermap.org/)
- `.yt <url of youtube video>`: **[S]** plays the audio of the given youtube video

## Events
- `On bot initialize`: joins voice channels and messages channels specified in `config.json`
- `On user joining voice channel bot is in`: plays their entrance theme, if they have one
- `On user leaving voice channel bot is in`: plays a sound clip to say bye

<small>This page was auto-generated. To edit, modify the files [here](scripts/auto-readme) and run `yarn docs`.</small>
