const { promises: fs } = require('fs');
const path = require('path');
const sass = require('sass');
const chalk = require('chalk');

const fileColor = chalk.yellow;

const generateCommands = async filename => {
    let commandFiles;
    try {
        commandFiles = await fs.readdir('./commands');
    } catch (e) {
        return console.error(e);
    }
    const commands = commandFiles.filter(file => file.endsWith('.js'))
        .map(file => {
            const command = require(`../../commands/${file}`);
            delete command.validator;
            delete command.execute;
            return command;
        });
    try {
        await fs.writeFile(filename, `commands = ${JSON.stringify(commands, null, 4)};`, 'utf8');
        console.log(`updated ${fileColor(filename)}`);
    } catch (e) {
        console.error(e);
    }
};

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

generateCommands('site/commands.js');
generateCss(path.resolve(__dirname, 'styles.scss'), 'site/styles.css');
