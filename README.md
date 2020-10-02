# Lilith
> Highly custom bot made with [discord.js](https://discord.js.org/#/) meant to succeed my current bot, [Mikkayla](https://github.com/mattpilla/Mikkayla)

## Prerequisites
- [Node.js](https://nodejs.org/en/) v12.0 or higher

## Setup
- Create your bot at https://discord.com/developers/applications/ and copy the bot's token
- Create `.env` at root of directory based on `.env.example`
    - `CLIENT_SECRET` uses the token from the previous step
    - `VOLUME` (optional) controls the volume of sounds played in a voice channel
- `npm ci` to install dependencies
    - Windows users may need to run `npm install --global --production --vs2015 --add-python-to-path windows-build-tools` as Administrator first
- `npm start` runs the bot!

### Extra
Assets aren't being tracked in this repo. Refer to the README in the `audio` directory for more info.

## Commands
- `hey`: says hi
- `.join`: joins your current voice channel and plays a sound clip
- `.leave`: plays a sound clip then exits voice

## Events
- `On user joining voice channel`: plays their entrance theme, if they have one
- `On user leaving voice channel`: plays a sound clip to say bye
