# Lilith
> Highly custom bot made with [discord.js](https://discord.js.org/#/) meant to succeed my current bot, [Mikkayla](https://github.com/mattpilla/Mikkayla)

## Prerequisites
- [Node.js](https://nodejs.org/en/) v12.0 or higher

## Setup
- Create your bot at https://discord.com/developers/applications/ and copy the bot's token
- Invite your bot to your server (see [Extra](#extra) section for more info)
- `npm ci` to install dependencies
    - Windows users may need to run `npm install --global --production --vs2015 --add-python-to-path windows-build-tools` as Administrator first
- `npm run copyfiles` creates `auth.json` and `config.json` by copying the files `auth.example.json` and `config.example.json`, respectively. You can choose to do this manually instead.
- modify `auth.json`:
    - `token`: the token from the first step
- modify `config.json` as you see fit:
    - `prefix`: the prefix for your bot's commands (ex: the prefix of `.help` would be `.`)
    - `owner`: your Discord ID; lets you run commands that have the `adminOnly` property
    - `volume`: the volume of sounds played in a voice channel
    - `embedColor`: the default color of MessageEmbeds
    - `gameRoleName`: the name of the role `.gameon` should add
    - `gameRoleColor`: the color of the role `.gameon` should add (expects hex string)
- `npm start` runs the bot!

### Extra
- Permissions are tricky, so you can use [this link](https://discordapi.com/permissions.html#372759761) to generate your bot's invite link. My suggested permissions are set there but you can change them if you know what you're doing.
- Assets aren't being tracked in this repo. Refer to the README in the [audio](audio) directory for more info.

## Commands
- `hey`: says hi

### From [commands](commands) directory
These commands are prefixed with `prefix` from `config.json` (assumed prefix of `.` here for simplicity).\
Refer to the README in the [commands](commands) directory for more info.
- `.gameclear`: (admin only) deletes the role given by `.gameon` from the server
- `.gameoff`: removes the role given by `.gameon` from the user
- `.gameon`: gives user role specified by `gameRoleName` in `config.json` (and creates it if it doesn't exist)
- `.join`: joins your current voice channel and plays a sound clip
- `.leave`: plays a sound clip then exits voice
- `.poke <Pokémon name or number> (shiny)`: gives types, abilities, stats, and sprite of Pokémon, using [PokéAPI](https://pokeapi.co/)

## Events
- `On user joining voice channel bot is in`: plays their entrance theme, if they have one
- `On user leaving voice channel bot is in`: plays a sound clip to say bye
