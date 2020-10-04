# Lilith
> Highly custom bot made with [discord.js](https://discord.js.org/#/) meant to succeed my current bot, [Mikkayla](https://github.com/mattpilla/Mikkayla)

## Prerequisites
- [Node.js](https://nodejs.org/en/) v12.0 or higher

## Setup
- Create your bot at https://discord.com/developers/applications/ and copy the bot's token
- Invite your bot to your server (see [Extra](#extra) section for more info)
- Create `.env` at root of directory based on `.env.example`
    - `CLIENT_SECRET` uses the token from the previous step
    - `VOLUME` (optional) controls the volume of sounds played in a voice channel
    - `GAME_ROLE_NAME` (optional) set the name of the role `.gameon` should add
    - `GAME_ROLE_COLOR` (optional) set the color of the role `.gameon` should add (expects hex string)
- `npm ci` to install dependencies
    - Windows users may need to run `npm install --global --production --vs2015 --add-python-to-path windows-build-tools` as Administrator first
- `npm start` runs the bot!

### Extra
- Permissions are tricky, so you can use [this link](https://discordapi.com/permissions.html#372759761) to generate your bot's invite link. My suggested permissions are set there but you can change them if you know what you're doing.
- Assets aren't being tracked in this repo. Refer to the README in the `audio` directory for more info.

## Commands
- `hey`: says hi
- `.gameon`: gives user role specified by `GAME_ROLE_NAME` in `.env` (and creates it if it doesn't exist)
- `.gameoff`: removes the role given by `.gameon` from the user
- `.join`: joins your current voice channel and plays a sound clip
- `.leave`: plays a sound clip then exits voice

## Events
- `On user joining voice channel`: plays their entrance theme, if they have one
- `On user leaving voice channel`: plays a sound clip to say bye
