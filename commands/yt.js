const { Util } = require('discord.js');
const ytdl = require('ytdl-core');
const { prefix, volume } = require('../config.json');

module.exports = {
    name: 'yt',
    guildOnly: true,
    usage: '<url of youtube video>',
    validator(args) {
        return args.length === 1;
    },
    async execute(message, args) {
        let url = args[0];
        // let urls be escaped with <> to hide link previews if they so choose
        if (url.startsWith('<') && url.endsWith('>')) {
            url = url.slice(1, -1);
        }
        const voiceChannel = message.member.voice.channel;
        if (voiceChannel) {
            let video;
            try {
                video = await ytdl.getBasicInfo(url);
            } catch (e) {
                console.error(e);
                return message.channel.send('didn\'t work. use the full url of a youtube video');
            }
            try {
                const connection = await voiceChannel.join();
                const dispatcher = connection.play(ytdl(video.videoDetails.videoId), {
                    bitrate: 'auto',
                    volume
                });
                // set custom property so we know it's a youtube video
                dispatcher.youtube = true;
                message.channel.send(`playing **${Util.escapeMarkdown(video.videoDetails.title)}** (\`${prefix}stop\` to stop)`);
            } catch (e) {
                console.error(e);
                message.channel.send('idk what went wrong but i can\'t play this for you now');
            }
        } else {
            message.channel.send('you\'re not in a voice channel so i can\'t play this');
        }
    }
};
