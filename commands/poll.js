// returns every token wrapped in quotes in array
const getTokens = args => args.join(' ').match(/"[^"]+"/g);

const reactions = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];

module.exports = {
  name: 'poll',
  description: 'creates a simple poll with 2-9 options',
  usage: '<question> <option 1> ... <option n> (separate terms by wrapping in quotes)',
  examples: ['"best color?" "purple" "teal"'],
  validator(args) {
    const numTokens = getTokens(args)?.length;
    return numTokens >= 3 && numTokens <= 10;
  },
  async execute(message, args) {
    // get all tokens and format into a poll
    const tokens = getTokens(args).map((token, index) => {
      // remove quotes
      const option = token.replace(/"/g, '');
      if (!index) {
        return `> ${option}`;
      }
      return `${index}. ${option}`;
    });
    const pollMsg = await message.channel.send(`### Poll started!\n${tokens.join('\n')}`);
    for (let i = 0; i < tokens.length - 1; i++) {
      pollMsg.react(reactions[i]);
    }
  }
};
