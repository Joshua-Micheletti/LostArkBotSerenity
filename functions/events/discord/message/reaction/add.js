const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const range = 'A:AF';

module.exports = async (event, context) => {
  var limit = await lib.utils.kv['@0.1.16'].get({
    key: `itemCount`
  });
  
  // variable to store the username
  var user = context.params.event.member.user.username;
  // variable to store the selected class to display
  var selectedClass = selectClass(context.params.event.emoji.name);

  // variable to store the selected row in the database
  var row = await lib.googlesheets.query['@0.3.0'].select({
    range: range,
    bounds: 'FULL_RANGE',
    where: [
      {
        messageID__is: context.params.event.message_id,
      },
    ],
    limit: {
      count: limit,
      offset: 0,
    },
  });
  
  // part of a longer implementation, needs checking
  /*
  var dateNumbers = row.rows[0].fields.eventDate.split('.');
  var hourNumbers = row.rows[0].fields.eventHour.split(':');
  
  var timeInEpoch = new Date(dateNumbers[2], dateNumbers[1] - 1, dateNumbers[0], hourNumbers[0], hourNumbers[1]).valueOf();
  timeInEpoch -= 60*60*1000;
  timeInEpoch = Math.floor(timeInEpoch / 1000);
  
  var eventTime = "<t:" + timeInEpoch + ":R>";
  */

  console.log(row.rows[0]);

  // variable for counting the available spots
  var availableSpots = row.rows[0].fields.memberCount;

  // count available spots
  if (row.rows[0].fields.member0) {
    availableSpots--;
  }
  if (row.rows[0].fields.member1) {
    availableSpots--;
  }
  if (row.rows[0].fields.member2) {
    availableSpots--;
  }
  if (row.rows[0].fields.member3) {
    availableSpots--;
  }
  if (row.rows[0].fields.member4) {
    availableSpots--;
  }
  if (row.rows[0].fields.member5) {
    availableSpots--;
  }
  if (row.rows[0].fields.member6) {
    availableSpots--;
  }
  if (row.rows[0].fields.member7) {
    availableSpots--;
  }

  var firstAvailableSpot;

  // check if the user is already registered
  if (
    row.rows[0].fields.member0 != user &&
    row.rows[0].fields.member1 != user &&
    row.rows[0].fields.member2 != user &&
    row.rows[0].fields.member3 != user &&
    row.rows[0].fields.member4 != user &&
    row.rows[0].fields.member5 != user &&
    row.rows[0].fields.member6 != user &&
    row.rows[0].fields.member7 != user
  ) {
    // check if the spot 0 is available
    if (!row.rows[0].fields.member0 && availableSpots != 0) {
      // enter the new member in the database
      await lib.googlesheets.query['@0.3.0'].replace({
        range: range,
        bounds: 'FULL_RANGE',
        replaceRows: [
          {
            index: row.rows[0].index,
            fields: {
              member0: context.params.event.member.user.username,
              userID0: context.params.event.member.user.id,
              class0: selectedClass,
            },
          },
        ],
      });
    }
    // check if the spot 1 is available
    else if (!row.rows[0].fields.member1 && availableSpots != 0) {
      // enter the new member in the database
      await lib.googlesheets.query['@0.3.0'].replace({
        range: range,
        bounds: 'FULL_RANGE',
        replaceRows: [
          {
            index: row.rows[0].index,
            fields: {
              member1: context.params.event.member.user.username,
              userID1: context.params.event.member.user.id,
              class1: selectedClass,
            },
          },
        ],
      });
    }
    // check if the spot 2 is available
    else if (!row.rows[0].fields.member2 && availableSpots != 0) {
      // enter the new member in the database
      await lib.googlesheets.query['@0.3.0'].replace({
        range: range,
        bounds: 'FULL_RANGE',
        replaceRows: [
          {
            index: row.rows[0].index,
            fields: {
              member2: context.params.event.member.user.username,
              userID2: context.params.event.member.user.id,
              class2: selectedClass,
            },
          },
        ],
      });
    }
    // check if the spot 3 is available
    else if (!row.rows[0].fields.member3 && availableSpots != 0) {
      // enter the new member in the database
      await lib.googlesheets.query['@0.3.0'].replace({
        range: range,
        bounds: 'FULL_RANGE',
        replaceRows: [
          {
            index: row.rows[0].index,
            fields: {
              member3: context.params.event.member.user.username,
              userID3: context.params.event.member.user.id,
              class3: selectedClass,
            },
          },
        ],
      });
    }
    // check if the spot 4 is available
    else if (!row.rows[0].fields.member4 && availableSpots != 0) {
      // enter the new member in the database
      await lib.googlesheets.query['@0.3.0'].replace({
        range: range,
        bounds: 'FULL_RANGE',
        replaceRows: [
          {
            index: row.rows[0].index,
            fields: {
              member4: context.params.event.member.user.username,
              userID4: context.params.event.member.user.id,
              class4: selectedClass,
            },
          },
        ],
      });
    }
    // check if the spot 5 is available
    else if (!row.rows[0].fields.member5 && availableSpots != 0) {
      // enter the new member in the database
      await lib.googlesheets.query['@0.3.0'].replace({
        range: range,
        bounds: 'FULL_RANGE',
        replaceRows: [
          {
            index: row.rows[0].index,
            fields: {
              member5: context.params.event.member.user.username,
              userID5: context.params.event.member.user.id,
              class5: selectedClass,
            },
          },
        ],
      });
    }
    // check if the spot 6 is available
    else if (!row.rows[0].fields.member6 && availableSpots != 0) {
      // enter the new member in the database
      await lib.googlesheets.query['@0.3.0'].replace({
        range: range,
        bounds: 'FULL_RANGE',
        replaceRows: [
          {
            index: row.rows[0].index,
            fields: {
              member6: context.params.event.member.user.username,
              userID6: context.params.event.member.user.id,
              class6: selectedClass,
            },
          },
        ],
      });
    }
    // check if the spot 7 is available
    else if (!row.rows[0].fields.member7 && availableSpots != 0) {
      // enter the new member in the database
      await lib.googlesheets.query['@0.3.0'].replace({
        range: range,
        bounds: 'FULL_RANGE',
        replaceRows: [
          {
            index: row.rows[0].index,
            fields: {
              member7: context.params.event.member.user.username,
              userID7: context.params.event.member.user.id,
              class7: selectedClass,
            },
          },
        ],
      });
    }
    // if there's no available spot, end the request here
    else {
      return;
    }
    
    // short implementation of message update
    // request the data from the original message
    var message = await lib.discord.channels['@0.3.0'].messages.retrieve({
      message_id: row.rows[0].fields.messageID, // required
      channel_id: row.rows[0].fields.channelID // required
    });
    // update the available spots message
    message.embeds[0].fields[3].value = "Available Spots: " + (availableSpots - 1);
    // add the new member to the list
    message.embeds[0].fields.push({
      name: user,
      value: selectedClass,
      inline: true,
    });
    // update the message with the edited info
    await lib.discord.channels['@0.3.0'].messages.update({
      message_id: row.rows[0].fields.messageID, // required
      channel_id: row.rows[0].fields.channelID, // required
      embeds: message.embeds
    });
    
    // longer implementation, keeps coherence between database and message
    /*
    // update the row variable with the new data from the database
    var row = await lib.googlesheets.query['@0.3.0'].select({
      range: range,
      bounds: 'FULL_RANGE',
      where: [
        {
          messageID__is: context.params.event.message_id,
        },
      ],
      limit: {
        count: limit,
        offset: 0,
      },
    });

    // reset the availableSpots variable for representation
    var availableSpots = row.rows[0].fields.memberCount;

    // setup the members to display in the message
    var members = [];

    // add member 0 to the list if available
    if (row.rows[0].fields.member0) {
      availableSpots--;
      members.push({
        name: row.rows[0].fields.member0,
        value: row.rows[0].fields.class0,
        inline: true,
      });
    }

    // add member 1 to the list if available
    if (row.rows[0].fields.member1) {
      availableSpots--;
      members.push({
        name: row.rows[0].fields.member1,
        value: row.rows[0].fields.class1,
        inline: true,
      });
    }

    // add member 2 to the list if available
    if (row.rows[0].fields.member2) {
      availableSpots--;
      members.push({
        name: row.rows[0].fields.member2,
        value: row.rows[0].fields.class2,
        inline: true,
      });
    }

    // add member 3 to the list if available
    if (row.rows[0].fields.member3) {
      availableSpots--;
      members.push({
        name: row.rows[0].fields.member3,
        value: row.rows[0].fields.class3,
        inline: true,
      });
    }
    
    // add member 4 to the list if available
    if (row.rows[0].fields.member4) {
      availableSpots--;
      members.push({
        name: row.rows[0].fields.member4,
        value: row.rows[0].fields.class4,
        inline: true,
      });
    }
    
    // add member 5 to the list if available
    if (row.rows[0].fields.member5) {
      availableSpots--;
      members.push({
        name: row.rows[0].fields.member5,
        value: row.rows[0].fields.class5,
        inline: true,
      });
    }
    
    // add member 6 to the list if available
    if (row.rows[0].fields.member6) {
      availableSpots--;
      members.push({
        name: row.rows[0].fields.member6,
        value: row.rows[0].fields.class6,
        inline: true,
      });
    }
    
    // add member 7 to the list if available
    if (row.rows[0].fields.member7) {
      availableSpots--;
      members.push({
        name: row.rows[0].fields.member7,
        value: row.rows[0].fields.class7,
        inline: true,
      });
    }
    
    // setup the fields for the event message
    var fields = [
      {
        name: 'Date',
        value: row.rows[0].fields.eventDate,
        inline: true,
      },
      {
        name: 'Hour',
        value: row.rows[0].fields.eventHour,
        inline: true,
      },
      {
        name: 'Starts in:',
        value: eventTime,
        inline: true
      },
      {
        name: '---------------------------',
        value: 'Available Spots: ' + availableSpots,
      },
    ];
    
    // add the members to the message fields
    fields = fields.concat(members);

    // update the message with the new fields
    await lib.discord.channels['@0.3.0'].messages.update({
      message_id: row.rows[0].fields.messageID, // required
      channel_id: row.rows[0].fields.channelID, // required
      content: '',
      tts: false,
      embeds: [
        {
          type: 'rich',
          color: row.rows[0].fields.color,
          title: row.rows[0].fields.eventName,
          description: 'Created by ' + row.rows[0].fields.author,
          fields: fields,
        },
      ],
    });
    */
    
  }
};

// function to return the formatted class name with corresponding emoji
function selectClass(emoji) {
  var selected;
  if (emoji == 'artillerist') {
    selected = '<:artillerist:938105970138173470> Artillerist';
  } else if (emoji == 'bard') {
    selected = '<:bard:938107418066419733> Bard';
  } else if (emoji == 'berserker') {
    selected = '<:berserker:938107473729056768> Berserker';
  } else if (emoji == 'deadeye') {
    selected = '<:deadeye:938107519941890178> Deadeye';
  } else if (emoji == 'deathblade') {
    selected = '<:deathblade:938107567643697163> Deathblade';
  } else if (emoji == 'gunlance') {
    selected = '<:gunlance:938107654616809543> Gunlancer';
  } else if (emoji == 'gunslinger') {
    selected = '<:gunslinger:938109917368320040> Gunslinger';
  } else if (emoji == 'paladin') {
    selected = '<:paladin:938107700745764904> Paladin';
  } else if (emoji == 'scrapper') {
    selected = '<:scrapper:938107738758709309> Scrapper';
  } else if (emoji == 'shadowhunter') {
    selected = '<:shadowhunter:938107785672024074> Shadowhunter';
  } else if (emoji == 'sharpshooter') {
    selected = '<:sharpshooter:938107892891009054> Sharpshooter';
  } else if (emoji == 'sorceress') {
    selected = '<:sorceress:938107930639728730> Sorceress';
  } else if (emoji == 'soulfist') {
    selected = '<:soulfist:938107984880488458> Soulfist';
  } else if (emoji == 'striker') {
    selected = '<:striker:938108033177911396> Striker';
  } else if (emoji == 'wardancer') {
    selected = '<:wardancer:938108072554025050> Wardancer';
  }

  return selected;
}