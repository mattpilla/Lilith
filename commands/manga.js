const { MessageEmbed } = require('discord.js');
const { request, gql } = require('graphql-request');
const { capitalizeText, htmlToMarkdown, truncateDescription } = require('../helpers.js');

const query = gql`
query ($search: String) {
  Media (search: $search, type: MANGA) {
    title {
      romaji
      english
      native
    }
    format
    status
    description
    chapters
    volumes
    source
    startDate {
        year
        month
    }
    endDate {
        year
        month
    }
    coverImage {
        large
        color
    }
    averageScore
  }
}`;

// converts start and end dates returned from API to:
// Month (if available) Year to Month (if available) Year
// end date will be "?" if unavailable
const convertMangaDate = (startDate, endDate) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const start = `${startDate.month ? `${months[startDate.month - 1]} ` : ''}${startDate.year}`;
    let end = '?';
    if (endDate.year) {
        end = `${endDate.month ? `${months[endDate.month - 1]} ` : ''}${endDate.year}`;
    }
    return `${start} to ${end}`;
};

module.exports = {
    name: 'manga',
    description: 'displays information of given manga, using [AniList API](https://anilist.gitbook.io/anilist-apiv2-docs/)',
    usage: '<search term>',
    examples: [
        'chainsaw man',
        'mha'
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
        const fields = [
            {
                name: 'Status',
                value: capitalizeText(media.status),
                inline: true
            }, ...(media.volumes ? [{
                name: 'Volumes',
                value: media.volumes,
                inline: true
            }]: []), ...(media.chapters ? [{
                name: 'Chapters',
                value: media.chapters,
                inline: true
            }]: []), {
                name: 'Source',
                value: capitalizeText(media.source),
                inline: true
            }, {
                name: 'Format',
                value: capitalizeText(media.format, ['TV', 'OVA', 'ONA']),
                inline: true
            }, ...(media.startDate.year ? [{
                name: 'Published',
                value: convertMangaDate(media.startDate, media.endDate),
                inline: true
            }] : [])
        ];
        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(truncateDescription(htmlToMarkdown.translate(media.description)))
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
