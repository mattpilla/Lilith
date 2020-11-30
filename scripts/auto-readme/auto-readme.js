const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const extraCommands = require('./extra-commands.json');
const events = require('./events.json');

// get the readme template
let readme = fs.readFileSync(path.resolve(__dirname, 'commands-template.md'), 'utf8');

// get and format the command docs based on the command properties
const commandDocs = fs.readdirSync('./commands')
    .filter(file => file.endsWith('.js'))
    .map(file => {
        const command = require(`../../commands/${file}`);
        // format each bullet
        const usage = command.usage ? ` ${command.usage}` : ''; // show usage if available
        let flags = `${command.adminOnly ? 'A' : ''}${command.guildOnly ? 'S' : ''}`;
        flags = flags ? `**[${flags}]** ` : ''; // list flags if available
        // list subcommands as indented bullets if they exist
        const subcommands = command.subcommands ? command.subcommands.map(c => `\n    - \`${c.name}\`: ${c.description}`).join('') : '';
        return `- \`.${command.name}${usage}\`: ${flags}${command.description}${subcommands}`;
    })
    .join('\n');

// get and format command docs that aren't from the commands directory
const extraDocs = extraCommands.map(command => {
        return `- \`${command.name}\`: ${command.description}`;
    })
    .join('\n');

// get and format event docs
const eventDocs = events.map(event => {
        return `- \`${event.name}\`: ${event.description}`;
    })
    .join('\n');

// add command docs to readme
readme = readme
    .replace('!!extra!!', extraDocs)
    .replace('!!commands!!', commandDocs)
    .replace('!!events!!', eventDocs);

// save readme
const generateAutoReadme = async filename => {
    try {
        await fs.promises.writeFile(filename, readme, 'utf8');
        console.log(`updated ${chalk.yellow(filename)}`);
    } catch (e) {
        console.error(e);
    }
};

generateAutoReadme('COMMANDS.md');
