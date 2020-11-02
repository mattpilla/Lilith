# Commands
- `hey`: says hi

## From [commands](commands) directory
These commands are prefixed with `prefix` from `config.json` (assumed prefix of `.` here for simplicity).\
Refer to the README in the [commands](commands) directory for more info.
- `.define <search term>`: Gives top definition of term from [Urban Dictionary](https://www.urbandictionary.com/)
- `.gameclear`: (admin only) deletes the role given by `.gameon` from the server
- `.gameoff`: removes the role given by `.gameon` from the user
- `.gameon`: gives user role specified by `gameRoleName` in `config.json` (and creates it if it doesn't exist)
- `.help`: links to this page
- `.inspiration`: posts an image generated from http://inspirobot.me
- `.join`: joins your current voice channel and plays a sound clip
- `.leave`: plays a sound clip then exits voice
- `.poke <Pokémon name or number>`: gives types, abilities, stats, and sprite of Pokémon, using [PokéAPI](https://pokeapi.co/)
- `.random <integer>`: gives a random number up to and including the given int
- `.restart`: (admin only) restarts the bot
- `.stop`: stops the currently playing audio
- `.yt <url of youtube video>`: plays the audio of the given youtube video

## Events
- `On bot initialize`: joins voice channels and messages channels specified in `config.json`
- `On user joining voice channel bot is in`: plays their entrance theme, if they have one
- `On user leaving voice channel bot is in`: plays a sound clip to say bye
