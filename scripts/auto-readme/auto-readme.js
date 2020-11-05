const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

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
        return `- \`.${command.name}${usage}\`: ${flags}${command.description}`;
    })
    .join('\n');

// add command docs to readme
readme = readme.replace('!!!!', commandDocs);

// save readme
const generateAutoReadme = async filename => {
    try {
        fs.writeFile(filename, readme, 'utf8');
        console.log(`updated ${chalk.yellow(filename)}`);
    } catch (e) {
        console.error(e);
    }
};

generateAutoReadme('COMMANDS.md');
