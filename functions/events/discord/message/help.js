const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

module.exports = async (event, context) => {
  if (context.params.event.content.match("!help")) {
    await lib.discord.channels['@0.2.0'].messages.create({
      "channel_id": `${context.params.event.channel_id}`,
      "content": "",
      "tts": false,
      "embeds": [
        {
          "type": "rich",
          "title": `Help`,
          "description": `Description of commands available`,
          "color": 0x00FFFF,
          "fields": [
            {
              "name": "\u200B",
              "value": `----------------------------`
            },
            {
              "name": `!create-event`,
              "value": `allows you to create a new event specifing name, date, hour and number of partecipants. Parameters need to be separated by a space, name can't contain spaces, date needs to be separated by '.', hour needs to be separated by ':' and number of members can't exceed 8`
            },
            {
              "name": `Syntax:`,
              "value": `!create-event \`name\` \`dd.mm.yyyy\` \`hh:mm\` \`member_count\``
            },
            {
              "name": `Example:`,
              "value": `!create-event MegaRaid 25.12.2022 12:30 4`
            },
            {
              "name": "\u200B",
              "value": `----------------------------`
            },
            {
              "name": `!set-channel`,
              "value": `Allows you to set a channel to display the event notices after creation`
            },
            {
              "name": `Syntax:`,
              "value": `!set-channel \`channel_name\``
            },
            {
              "name": `Example:`,
              "value": `!set-channel general`
            }
          ]
        }
      ]
    });
  }
};
