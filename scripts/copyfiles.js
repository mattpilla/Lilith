const { promises: fs } = require('fs');
const chalk = require('chalk');
const authExample = require('../auth.example.json');
const configExample = require('../config.example.json');

const fileColor = chalk.yellow;

// imports json if exists, returns empty object otherwise
const getFile = filename => {
    let file = {};
    try {
        file = require(`../${filename}`);
    } catch {
        console.log(`${fileColor(filename)} doesn't exist. creating...`);
    }
    return file;
};

// copies key/value pair to obj from exampleObj if and only if key doesn't already exist on obj
// returns updated file or false if no changes
const copyKeys = (obj, exampleObj, filename) => {
    let updated = false;
    Object.keys(exampleObj).forEach(key => {
        if (obj[key] === undefined) {
            obj[key] = exampleObj[key];
            updated = true;
            console.log(`added ${chalk.cyan(`${key} = ${JSON.stringify(obj[key])}`)} to ${fileColor(filename)}`);
        }
    });
    return updated ? obj : false;
};

// get file, copies keys, then saves to file
const copyFiles = async (filename, exampleFile) => {
    let file = getFile(filename);
    file = copyKeys(file, exampleFile, filename);
    if (!file) {
        return console.log(`no updates made to ${fileColor(filename)}`);
    }
    try {
        await fs.writeFile(filename, JSON.stringify(file, null, 4), 'utf8');
        console.log(`updated ${fileColor(filename)}`);
    } catch (e) {
        console.error(e);
    }
};

copyFiles('auth.json', authExample);
copyFiles('config.json', configExample);
