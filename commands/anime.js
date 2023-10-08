const { MessageEmbed } = require('discord.js');
const { request, gql } = require('graphql-request');
const { capitalizeText, htmlToMarkdown, truncateDescription } = require('../helpers.js');

const query = gql`
query ($search: String) {
    Media (search: $search, type: ANIME) {
        title {
            romaji
            english
            native
        }
        status
        description(asHtml: false)
        season
        seasonYear
        episodes
        source
        format
        studios(isMain: true) {
            nodes {
                name
            }
        }
        coverImage {
            large
            color
        }
        averageScore
        nextAiringEpisode {
            episode
            timeUntilAiring
        }
    }
}`;

// converts seconds returned from API to:
// on m/d/y (if >30 days)
// in X days, Y hours (if >1 day)
// in Y hours (otherwise)
const convertAnimeTime = seconds => {
    const hours = Math.floor((seconds / 60 / 60)) % 24;
    const days = Math.floor(seconds / 60 / 60 / 24);
    if (days > 30) {
        const d = new Date();
        d.setSeconds(d.getSeconds() + seconds);
        return `on ${d.toLocaleDateString()}`;
    }
    return `in ${days ? `${days} day${days === 1 ? '' : 's'}, ` : ''}${hours} hour${hours === 1 ? '' : 's'}`;
};

module.exports = {
    name: 'anime',
    description: 'displays information of given anime, using [AniList API](https://anilist.gitbook.io/anilist-apiv2-docs/)',
    usage: '<search term>',
    examples: [
        'cowboy bebop',
        'fmab'
    ],
    validator(args) {
        return args.length > 0;
    },
    async execute(message, args) {
        const search = args.join(' ');
        const errorMsg = `no results for \`${search}\``;
        let data;
        try {
            data = await request('https://graphql.anilist.co', query, { search });
        } catch (e) {
            return message.channel.send(errorMsg);
        }
        const media = data.Media;
        if (!media) {
            return message.channel.send(errorMsg);
        }
        let title = media.title.english || media.title.romaji;
        if (title && media.title.romaji && media.title.romaji.toLowerCase() !== title.toLowerCase()) {
            title = `${title} (${media.title.romaji})`;
        }
        let studios = null;
        if (media.studios && media.studios.nodes) {
            studios = media.studios.nodes.map(studio => studio.name);
        }
        const fields = [
            {
                name: 'Status',
                value: capitalizeText(media.status),
                inline: true
            }, ...(media.season ? [{
                name: 'Season',
                value: `${capitalizeText(media.season)} ${media.seasonYear}`,
                inline: true
            }]: []), ...(media.episodes ? [{
                name: 'Episodes',
                value: media.episodes,
                inline: true
            }]: []), ...(studios ? [{
                name: studios.length === 1 ? 'Studio' : 'Studios',
                value: studios.join(', '),
                inline: true
            }]: []), {
                name: 'Source',
                value: capitalizeText(media.source),
                inline: true
            }, {
                name: 'Format',
                value: capitalizeText(media.format, ['TV', 'OVA', 'ONA']),
                inline: true
            }, ...(media.nextAiringEpisode ? [{
                name: 'Next Airing Episode',
                value: `Episode ${media.nextAiringEpisode.episode} airing ${convertAnimeTime(media.nextAiringEpisode.timeUntilAiring)}`,
                inline: true
            }] : [])
        ];
        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(truncateDescription(htmlToMarkdown.translate(media.description || '')))
            .addFields(fields)
            .setImage(media.coverImage.large)
            .setColor(media.coverImage.color);
        if (media.title.native) {
            embed.setAuthor(media.title.native);
        }
        if (media.averageScore) {
            embed.setFooter(`Average Score: ${media.averageScore}%`);
        }
        message.channel.send(embed);
    }
};
