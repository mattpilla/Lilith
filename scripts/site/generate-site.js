const { promises: fs } = require('fs');
const path = require('path');
const sass = require('sass');
const chalk = require('chalk');
const md = require('markdown-it')();
let extraCommands = require('../auto-readme/extra-commands.json');
let events = require('../auto-readme/events.json');

const fileColor = chalk.yellow;

// create js variables the site can use as data for docs
const generateSiteData = async filename => {
    let commandFiles;
    try {
        commandFiles = await fs.readdir('./commands');
    } catch (e) {
        return console.error(e);
    }
    const commands = commandFiles.filter(file => file.endsWith('.js'))
        .map(file => {
            const command = require(`../../commands/${file}`);
            command.description = md.renderInline(command.userDescription || command.description);
            delete command.validator;
            delete command.execute;
            return command;
        });
    extraCommands = extraCommands.map(command => {
        command.description = md.renderInline(command.userDescription || command.description);
        return command;
    });
    events = events.map(event => {
        event.description = md.renderInline(event.userDescription || event.description);
        return event;
    });
    const siteData = (
`commands = ${JSON.stringify(commands, null, 4)};
extraCommands = ${JSON.stringify(extraCommands, null, 4)};
events = ${JSON.stringify(events, null, 4)};
`);
    try {
        await fs.writeFile(filename, siteData, 'utf8');
        console.log(`updated ${fileColor(filename)}`);
    } catch (e) {
        console.error(e);
    }
};

// convert sass to css to be used for site
const generateCss = async (input, output) => {
    try {
        const result = sass.renderSync({
            file: input,
            outFile: output,
            outputStyle: 'compressed'
        });
        await fs.writeFile(output, result.css, 'utf8');
        console.log(`updated ${fileColor(output)}`);
    } catch (e) {
        return console.error(e);
    }
};

generateSiteData('site/data.js');
generateCss(path.resolve(__dirname, 'styles.scss'), 'site/styles.css');
