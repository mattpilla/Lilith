# Auto README Generator
Run this with `yarn docs`. Creates [COMMANDS.md](/COMMANDS.md).

- `command-template.md`: where the general docs are written
- `extra-commands.json`: docs for commands not in the `commands` directory are written here, and replace `!!extra!!` in `command-template.md` (`userDescription` can be used for a more user-friendly description for the help command)
- `events.json`: docs for bot events are written here, and replace `!!events!!` in `command-template.md` (`userDescription` can be used for a more user-friendly description for the help command)
- `auto-readme.js` automatically creates a list of commands and their descriptions, replaces `!!commands!!` in `command-template.md` with it, and saves it to [COMMANDS.md](/COMMANDS.md)
