const { promises: fs } = require('fs');
const path = require('path');
const sass = require('sass');
const chalk = require('chalk');

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

generateCss(path.resolve(__dirname, './styles.scss'), 'site/styles.css');
