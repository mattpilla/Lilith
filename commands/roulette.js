const { Collection } = require('discord.js');
const { prefix, rouletteTimeout } = require('../config.json');
const { randInt, randElement, timeoutPromise } = require('../helpers.js');

const sessions = new Collection();
const keyword = 'shoot'; // keyword for firing a shot
const shootEmoji = ['grimacing', 'zany_face', 'woozy_face', 'joy']; // possible emoji to shoot
const deathEmoji = ['exploding_head', 'boom', 'skull', 'ghost']; // possible dead emoji

const newGame = channel => {
    const gameData = {
        shooting: false, // true if in the process of shooting
        position: randInt(6), // determine bullet position from the start. 0 = next shot
        shots: 0 // shots fired so far
    };
    sessions.set(channel.id, gameData);
    const collector = channel.createMessageCollector(msg => {
        return msg.content === keyword;
    }, { idle: rouletteTimeout });

    collector.on('collect', async msg => {
        const gameData = sessions.get(channel.id);
        if (!gameData || gameData.shooting) {
            return;
        }
        gameData.shooting = true; // don't accept any more shots until this is false again
        gameData.shots++;
        sessions.set(channel.id, gameData);
        const shootMsg = await channel.send(`:${randElement(shootEmoji)}::gun:`);

        // if there's a chance of survival, wait before taking the shot. othewise skip this
        if (gameData.shots < 6) {
            await channel.send(`taking shot ${gameData.shots}...`);
            await timeoutPromise(1000);
        }
        gameData.shooting = false; // can accept shots again
        if (gameData.position > 0) {
            // shot didn't kill
            gameData.position--;
            const bonusMsg = gameData.shots < 5 ? '' : `. type \`${keyword}\` to die instantly`; // say something extra if next shot loses
            channel.send(`you lived :relieved:${bonusMsg}`);
            sessions.set(channel.id, gameData);
        } else {
            // shot killed
            shootMsg.edit(`:${randElement(deathEmoji)}::gun:`);
            channel.send(`${msg.author} is dead :skull_crossbones:`);
            collector.stop();
        }
    });

    collector.on('end', (collected, reason) => {
        sessions.delete(channel.id);
        if (reason === 'idle') {
            channel.send(`yall took too long so i ended the game (\`${prefix}roulette\` to play again)`);
        }
    });
};

module.exports = {
    name: 'roulette',
    description: 'play russian roulette without the threat of actually dying',
    guildOnly: true,
    exact: true,
    execute(message, args) {
        if (sessions.has(message.channel.id)) {
            return message.channel.send(`a game's already going here. type \`${keyword}\` to play that. or just wait for it end`);
        }
        newGame(message.channel);
        message.channel.send(`loaded a fresh revolver with a bullet. type \`${keyword}\` to test your luck`);
    }
};
