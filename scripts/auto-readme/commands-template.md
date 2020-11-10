# Commands
- `hey`: says hi

## From [commands](commands) directory
These commands are prefixed with `prefix` from `config.json` (assumed prefix of `.` here for simplicity).\
**[A]** means only the bot's admins can use this command.\
**[S]** means the command can only be used in a server (not in DMs).\
Indented commands are related to the command above it.\
Refer to the README in the [commands](commands) directory for more info.
!!!!

## Events
- `On bot initialize`: joins voice channels and messages channels specified in `config.json`
- `On user joining voice channel bot is in`: plays their entrance theme, if they have one
- `On user leaving voice channel bot is in`: plays a sound clip to say bye

<small>This page was auto-generated. To edit, modify the files [here](scripts/auto-readme) and run `yarn docs`.</small>
