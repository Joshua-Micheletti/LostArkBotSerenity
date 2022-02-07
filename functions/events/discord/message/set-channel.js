const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

module.exports = async (event, context) => {
  if (context.params.event.content.match('!set-channel')) {
    var parameters = context.params.event.content.split(" ");
    
    var channels = await lib.discord.guilds['@0.2.2'].channels.list({
      guild_id: context.params.event.guild_id,
    });

    console.log(channels);
    
    var found = false;
    
    for (let i = 0; i < channels.length; i++) {
      if (channels[i].name == parameters[1]) {
        await lib.utils.kv.set({
          key: 'channelID',
          value: channels[i].id
        });
        
        await lib.discord.channels['@0.3.0'].messages.create({
          channel_id: context.params.event.channel_id,
          content: "Event channel set to <#" + channels[i].id + ">"
        });
        
        found = true;
      }
    }
    
    if (!found) {
      await lib.discord.channels['@0.3.0'].messages.create({
        channel_id: context.params.event.channel_id,
        content: "No channels found with that name!"
      });
    }
  }
};
