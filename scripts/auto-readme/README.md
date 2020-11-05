# Auto README Generator
Run this with `yarn docs`. Creates [COMMANDS.md](COMMANDS.md).

- `command-template.md` is where the general docs are written. It includes the string `!!!!` where the content from `auto-readme.js` should go.
- `auto-readme.js` automatically creates a list of commands and their descriptions, combines it into `command-template.md`, and saves it to [COMMANDS.md](COMMANDS.md).
