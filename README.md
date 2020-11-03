# Lilith
> Highly custom bot made with [discord.js](https://discord.js.org/#/) meant to succeed my current bot, [Mikkayla](https://github.com/mattpilla/Mikkayla)

## Prerequisites
- [Node.js](https://nodejs.org/en/) v12.0 or higher
- [Yarn](https://yarnpkg.com/)

## Setup
- Create your bot at https://discord.com/developers/applications/ and copy the bot's token
- Invite your bot to your server (see [Extra](#extra) for more info)
- `yarn ci` to install dependencies
    - Windows users may need to run `npm install --global --production --vs2015 --add-python-to-path windows-build-tools` as Administrator if this fails
    - this is a custom script; running `yarn` will also install dependencies, but without doing anything extra
    - `auth.json` and `config.json` should now exist (see [Extra](#extra) for more info)
- modify `auth.json`:
    - `token`: the token from the first step
- modify `config.json` as you see fit:
    - `prefix`: the prefix for your bot's commands (ex: the prefix of `.help` would be `.`)
    - `owner`: your Discord ID; lets you run commands that have the `adminOnly` property
    - `volume`: the volume of sounds played in a voice channel
    - `embedColor`: the default color of MessageEmbeds
    - `gameRoleName`: the name of the role `.gameon` should add
    - `gameRoleColor`: the color of the role `.gameon` should add (expects hex string)
    - `voiceChannels`: array of voice channel IDs for the bot to join upon startup
    - `homeChannels`: array of channel IDs to message upon startup (useful to know when the bot starts)
- `yarn start` (or `yarn dev`) runs the bot!
    - If running on a server, see [Running on a server](#running-on-a-server) instead

### Extra
- Permissions are tricky, so you can use [this link](https://discordapi.com/permissions.html#372759761) to generate your bot's invite link. My suggested permissions are set there but you can change them if you know what you're doing.
- Assets aren't being tracked in this repo. Refer to the README in the [audio](audio) directory for more info.
- `yarn copyfiles` takes keys that don't exist in `auth.example.json` and `config.example.json` and copies them into `auth.json` and `config.json`, respectively. It creates these files if they don't exist. This is run automatically after every `yarn ci`.

## Running on a server
Instead of using `yarn start` which restarts on file change and is suited for development, you can use [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/) to host the bot.
- `yarn global add pm2` to install pm2 globally before setting up the bot
- follow the steps in [Setup](#setup)
- `yarn prod` to run via pm2, restarting every day at 7am
- `yarn update` gets the latest changes from git, reinstalls dependencies, and reloads the app with 0 downtime
- `yarn restart` restarts the bot

## Commands
Refer to [COMMANDS.md](COMMANDS.md) to see what the bot can do.
