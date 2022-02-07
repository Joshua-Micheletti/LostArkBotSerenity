const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const range = 'A:AF';

const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

if (context.params.event.content.match('!create-event')) {
  var parameters = context.params.event.content.split(' ');
  
  var channelID = await lib.utils.kv['@0.1.16'].get({
    key: `channelID`
  });

  if (!checkParameters(parameters)) {
    await lib.discord.channels['@0.3.0'].messages.create({
      channel_id: context.params.event.channel_id,
      content: `Invalid Info`,
    });
    return false;
  }

  console.log(context);
  
  var dateNumbers = parameters[2].split('.');
  var hourNumbers = parameters[3].split(':');

  var timeInEpoch = new Date(
    dateNumbers[2],
    dateNumbers[1] - 1,
    dateNumbers[0],
    hourNumbers[0],
    hourNumbers[1]
  ).valueOf();

  timeInEpoch -= 60 * 60 * 1000;

  timeInEpoch = Math.floor(timeInEpoch / 1000);

  var eventTime = '<t:' + timeInEpoch + ':R>';
  var hue = Math.random() * 360;
  var color = HSLToRGB(hue, 100, 50);

  var colorHexString = "0x";

  for (let i = 0; i < color.length; i++) {
    color[i] = Math.round(color[i]);
    
    if (color[i] < 16) {
      color[i] = "0" + color[i].toString(16);
    } else {
      color[i] = color[i].toString(16);
    }
    
    colorHexString += color[i];
  }

  var colorHex = parseInt(colorHexString);


  var message = await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: channelID,
    content: '',
    tts: false,
    embeds: [
      {
        type: 'rich',
        color: colorHex,
        title: parameters[1],
        description: 'Created by ' + context.params.event.author.username,
        fields: [
          {
            name: 'Date',
            value: parameters[2],
            inline: true,
          },
          {
            name: 'Hour',
            value: parameters[3],
            inline: true,
          },
          {
            name: 'Starts in:',
            value: eventTime,
            inline: true,
          },
          {
            name: '---------------------------',
            value: 'Available Spots: ' + parameters[4],
          },
        ],
      },
    ],
  });

  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:berserker:938107473729056768>', // required
    message_id: message.id, // required
    channel_id: channelID, // required
  });

  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:paladin:938107700745764904>', // required
    message_id: message.id, // required
    channel_id: channelID, // required
  });

  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:gunlance:938107654616809543>', // required
    message_id: message.id, // required
    channel_id: channelID, // required
  });

  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:striker:938108033177911396>', // required
    message_id: message.id, // required
    channel_id: channelID, // required
  });

  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:wardancer:938108072554025050>', // required
    message_id: message.id, // required
    channel_id: channelID, // required
  });

  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:scrapper:938107738758709309>', // required
    message_id: message.id, // required
    channel_id: channelID, // required
  });

  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:soulfist:938107984880488458>', // required
    message_id: message.id, // required
    channel_id: channelID, // required
  });

  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:gunslinger:938109917368320040>', // required
    message_id: message.id, // required
    channel_id: channelID, // required
  });

  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:artillerist:938105970138173470>', // required
    message_id: message.id, // required
    channel_id: channelID, // required
  });

  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:deadeye:938107519941890178>', // required
    message_id: message.id, // required
    channel_id: channelID, // required
  });

  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:sharpshooter:938107892891009054>', // required
    message_id: message.id, // required
    channel_id: channelID, // required
  });

  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:bard:938107418066419733>', // required
    message_id: message.id, // required
    channel_id: channelID, // required
  });

  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:sorceress:938107930639728730>', // required
    message_id: message.id, // required
    channel_id: channelID, // required
  });

  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:shadowhunter:938107785672024074>', // required
    message_id: message.id, // required
    channel_id: channelID, // required
  });

  await lib.discord.channels['@0.3.0'].messages.reactions.create({
    emoji: '<:deathblade:938107567643697163>', // required
    message_id: message.id, // required
    channel_id: channelID, // required
  });

  await lib.googlesheets.query['@0.3.0'].insert({
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
}

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


function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
