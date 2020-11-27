const { promises: fs } = require('fs');
const path = require('path');
const sass = require('sass');
const chalk = require('chalk');
const md = require('markdown-it')();

const generateCss = async (input, output) => {
    try {
        const result = sass.renderSync({
            file: input,
            outFile: output,
            outputStyle: 'compressed'
        });
        await fs.writeFile(output, result.css, 'utf8');
        console.log(`updated ${chalk.yellow(output)}`);
    } catch (e) {
        return console.error(e);
    }
};

const generateHtml = async (input, output) => {
    let html;
    try {
        // get the html template
        html = await fs.readFile(input, 'utf8');
    } catch (e) {
        return console.error(e);
    }

    // get and format the command docs based on the command properties
    let commandFiles;
    try {
        commandFiles = await fs.readdir('./commands');
    } catch (e) {
        return console.error(e);
    }
    const commandHtml = commandFiles.filter(file => file.endsWith('.js'))
        .map(file => {
            const command = require(`../../commands/${file}`);
            // format each bullet
            const usage = command.usage ? ` ${command.usage}` : ''; // show usage if available
            let flags = `${command.adminOnly ? 'A' : ''}${command.guildOnly ? 'S' : ''}`;
            flags = flags ? `**[${flags}]** ` : ''; // list flags if available
            // list subcommands as indented bullets if they exist
            const subcommands = command.subcommands ? command.subcommands.map(c => `\n\t- \`${c.name}\`: ${c.description}`).join('') : '';
            return `<div class="command">
                <strong>.${command.name}${usage}</strong>
                <span>${flags}</span>
                <span>${md.renderInline(command.description)}</span>
                ${subcommands}
            </div>`;
        })
        .join('\n');

    // add command docs to html
    html = html.replace('!!!!', commandHtml);

    // save html
    try {
        await fs.writeFile(output, html, 'utf8');
        console.log(`updated ${chalk.yellow(output)}`);
    } catch (e) {
        console.error(e);
    }
};

generateCss(path.resolve(__dirname, 'styles.scss'), 'site/styles.css');
generateHtml(path.resolve(__dirname, 'index-template.html'), 'site/index.html');
