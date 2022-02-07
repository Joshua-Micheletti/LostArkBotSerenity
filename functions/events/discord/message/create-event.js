const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// range in database where values are stored
const range = 'A:AF';

// function to convert HSL to RGB
const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

// check if the message received contains "!create-event"
if (context.params.event.content.match('!create-event')) {
  // get the parameters in an array by splitting the content at every ' '
  var parameters = context.params.event.content.split(' ');
  
  // get the channelID where to send the message
  var channelID = await lib.utils.kv['@0.1.16'].get({
    key: `channelID`
  });

  // check if all the parameters are correct
  if (!checkParameters(parameters)) {
    // send an error message in case they aren't
    await lib.discord.channels['@0.3.0'].messages.create({
      channel_id: context.params.event.channel_id,
      content: `Invalid Info`,
    });
    return false;
  }
  
  // isolate the numbers that make up the date and hour into 2 arrays
  var dateNumbers = parameters[2].split('.');
  var hourNumbers = parameters[3].split(':');

  // calculate the eventTime in ms since Epoch (unix time)
  var timeInEpoch = new Date(
    dateNumbers[2],
    dateNumbers[1] - 1,
    dateNumbers[0],
    hourNumbers[0],
    hourNumbers[1]
  ).valueOf();

  // remove 1h to allign with CET timezone
  timeInEpoch -= 60 * 60 * 1000;

  timeInEpoch = Math.floor(timeInEpoch / 1000);

  // create a discord tag containing the time
  var eventTime = '<t:' + timeInEpoch + ':R>';
  
  // get a random hue value
  var hue = Math.random() * 360;
  // convert the hue (hsl) to rgb values
  var color = HSLToRGB(hue, 100, 50);

  // compose the hex string representing the rgb color
  var colorHexString = "0x";
  // for every component of the color
  for (let i = 0; i < color.length; i++) {
    color[i] = Math.round(color[i]);
    // convert the value to hex (base 16)
    if (color[i] < 16) {
      color[i] = "0" + color[i].toString(16);
    } else {
      color[i] = color[i].toString(16);
    }
    // and concatenate the string
    colorHexString += color[i];
  }

  // convert the hex string to an int
  var colorHex = parseInt(colorHexString);

  // print the created message
  var message = await lib.discord.channels['@0.2.0'].messages.create({
    // channelID setup with !set-channel
    channel_id: channelID,
    content: '',
    tts: false,
    embeds: [
      {
        type: 'rich',
        // color chosen randomly
        color: colorHex,
        // title is the first parameter of the command
        title: parameters[1],
        description: 'Created by ' + context.params.event.author.username,
        fields: [
          // date is the second parameter of the command
          {
            name: 'Date',
            value: parameters[2],
            inline: true,
          },
          // hour is the third parameter of the command
          {
            name: 'Hour',
            value: parameters[3],
            inline: true,
          },
          // display the unix time tag to show how long till the event starts
          {
            name: 'Starts in:',
            value: eventTime,
            inline: true,
          },
          // available spots is the fourth parameter
          {
            name: '---------------------------',
            value: 'Available Spots: ' + parameters[4],
          },
        ],
      },
    ],
  });

  // add reactions to the message (particularly slow)
  // berserker
  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:berserker:938107473729056768>',
    message_id: message.id,
    channel_id: channelID
  });

  // paladin
  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:paladin:938107700745764904>',
    message_id: message.id,
    channel_id: channelID
  });

  // gunlancer
  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:gunlance:938107654616809543>',
    message_id: message.id,
    channel_id: channelID
  });

  // striker
  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:striker:938108033177911396>',
    message_id: message.id,
    channel_id: channelID
  });

  // wardancer
  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:wardancer:938108072554025050>',
    message_id: message.id,
    channel_id: channelID
  });

  // scrapper
  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:scrapper:938107738758709309>',
    message_id: message.id,
    channel_id: channelID
  });

  // soulfist
  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:soulfist:938107984880488458>',
    message_id: message.id,
    channel_id: channelID
  });

  // gunslinger
  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:gunslinger:938109917368320040>',
    message_id: message.id,
    channel_id: channelID
  });

  // artillerist
  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:artillerist:938105970138173470>',
    message_id: message.id,
    channel_id: channelID
  });

  // deadeye
  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:deadeye:938107519941890178>',
    message_id: message.id,
    channel_id: channelID
  });

  // sharpshooter
  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:sharpshooter:938107892891009054>',
    message_id: message.id,
    channel_id: channelID
  });

  // bard
  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:bard:938107418066419733>',
    message_id: message.id,
    channel_id: channelID
  });

  // sorceresss
  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:sorceress:938107930639728730>',
    message_id: message.id,
    channel_id: channelID
  });

  // shadowhunter
  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:shadowhunter:938107785672024074>',
    message_id: message.id,
    channel_id: channelID
  });

  // deathblade
  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:deathblade:938107567643697163>',
    message_id: message.id,
    channel_id: channelID
  });

  // insert the data that was displayed in the database
  var entry = await lib.googlesheets.query['@0.3.0'].insert({
    range: range,
    fieldsets: [
      {
        eventName: parameters[1],
        eventDate: parameters[2],
        eventHour: parameters[3],
        memberCount: parameters[4],
        messageID: message.id,
        channelID: channelID,
        color: colorHex.toString(),
        author: context.params.event.author.username,
      },
    ],
  });
  
  // check the itemCount variable
  var lastItem = await lib.utils.kv['@0.1.16'].get({
    key: `itemCount`,
  });
  
  // if the new entry is placed after the last entry
  if ((entry.rows[0].index - 1) > lastItem) {
    // update the itemCount with the new index
    await lib.utils.kv['@0.1.16'].set({
      key: `itemCount`,
      value: entry.rows[0].index - 1
    });
  }
}


// function to check if the parameters are valid
function checkParameters(parameters) {
  if (parameters.length != 5) {
    return false;
  }

  var name = parameters[1];

  if (!name) {
    return false;
  }

  var date = parameters[2];

  var numbers = date.split('.');

  if (numbers.length != 3) {
    return false;
  }

  if (isNaN(numbers[0]) && isNaN(numbers[1]) && isNaN(numbers[2])) {
    return false;
  }

  for (let i = 0; i < 3; i++) {
    numbers[i] = parseInt(numbers[i]);
  }

  if (numbers[0] > 31 || numbers[0] <= 0) {
    return false;
  } else if (numbers[1] > 12 || numbers[1] <= 0) {
    return false;
  } else if (numbers[2] != 2022 && numbers[2] != 2023) {
    return false;
  }

  var hour = parameters[3];
  var hnumbers = hour.split(':');

  if (hnumbers.length != 2) {
    return false;
  }

  if (isNaN(hnumbers[0]) || isNaN(hnumbers[1])) {
    return false;
  }

  for (let i = 0; i < 2; i++) {
    hnumbers[i] = parseInt(hnumbers[i]);
  }

  if (hnumbers[0] >= 24 || hnumbers < 0) {
    return false;
  } else if (hnumbers[1] >= 60 || hnumbers < 0) {
    return false;
  }

  var members = parameters[4];

  if (isNaN(members)) {
    return false;
  }

  members = parseInt(members);

  if (members <= 0 || members > 8) {
    return false;
  }

  return true;
}
