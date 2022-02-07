/**
 * An HTTP endpoint that acts as a webhook for Discord message.reaction.remove event
 * @param {object} event
 * @returns {any} result
 */
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const range = "A:AF";

module.exports = async (event, context) => {
  
  //var user = context.params.event.member.user.username;
  
  var selectedClass = selectClass(context.params.event.emoji.name);
  
  var userID = context.params.event.user_id;
  
  console.log(selectedClass);
  
  //console.log(user);
  console.log(context.params.event.message_id);
  var row = await lib.googlesheets.query['@0.3.0'].select({
    range: range,
    bounds: 'FULL_RANGE',
    where: [
      {
        'messageID__is': context.params.event.message_id
      }
    ],
    limit: {
      'count': 0,
      'offset': 0
    }
  });
  
  var dateNumbers = row.rows[0].fields.eventDate.split('.');
  var hourNumbers = row.rows[0].fields.eventHour.split(':');
  
  var timeInEpoch = new Date(dateNumbers[2], dateNumbers[1] - 1, dateNumbers[0], hourNumbers[0], hourNumbers[1]).valueOf();
  timeInEpoch -= 60*60*1000
  timeInEpoch = Math.floor(timeInEpoch / 1000);
  
  var eventTime = "<t:" + timeInEpoch + ":R>";
  
  console.log(row.rows[0]);
  
  if (row.rows[0].fields.userID0 == userID && row.rows[0].fields.class0 == selectedClass) {
    await lib.googlesheets.query['@0.3.0'].replace({
      range: range,
      bounds: 'FULL_RANGE',
      replaceRows: [
        {
          'index': row.rows[0].index,
          'fields': {
            member0: "",
            userID0: "",
            class0: ""
          }
        }
      ]
    });
    
  }
  
  else if (row.rows[0].fields.userID1 == userID && row.rows[0].fields.class1 == selectedClass) {
    await lib.googlesheets.query['@0.3.0'].replace({
      range: range,
      bounds: 'FIRST_EMPTY_ROW',
      replaceRows: [
        {
          'index': row.rows[0].index,
          'fields': {
            member1: "",
            userID1: "",
            class1: ""
          }
        }
      ]
    }); 
  }
  
  else if (row.rows[0].fields.userID2 == userID && row.rows[0].fields.class2 == selectedClass) {
    await lib.googlesheets.query['@0.3.0'].replace({
      range: range,
      bounds: 'FULL_RANGE',
      replaceRows: [
        {
          'index': row.rows[0].index,
          'fields': {
            member2: "",
            userID2: "",
            class2: ""
          }
        }
      ]
    }); 
  }
  
  else if (row.rows[0].fields.userID3 == userID && row.rows[0].fields.class3 == selectedClass) {
    await lib.googlesheets.query['@0.3.0'].replace({
      range: range,
      bounds: 'FULL_RANGE',
      replaceRows: [
        {
          'index': row.rows[0].index,
          'fields': {
            member3: "",
            userID3: "",
            class3: ""
          }
        }
      ]
    }); 
  }
  
  else if (row.rows[0].fields.userID4 == userID && row.rows[0].fields.class4 == selectedClass) {
    await lib.googlesheets.query['@0.3.0'].replace({
      range: range,
      bounds: 'FULL_RANGE',
      replaceRows: [
        {
          'index': row.rows[0].index,
          'fields': {
            member4: "",
            userID4: "",
            class4: ""
          }
        }
      ]
    }); 
  }
  
  else if (row.rows[0].fields.userID5 == userID && row.rows[0].fields.class5 == selectedClass) {
    await lib.googlesheets.query['@0.3.0'].replace({
      range: range,
      bounds: 'FULL_RANGE',
      replaceRows: [
        {
          'index': row.rows[0].index,
          'fields': {
            member5: "",
            userID5: "",
            class5: ""
          }
        }
      ]
    }); 
  }
  
  else if (row.rows[0].fields.userID6 == userID && row.rows[0].fields.class6 == selectedClass) {
    await lib.googlesheets.query['@0.3.0'].replace({
      range: range,
      bounds: 'FULL_RANGE',
      replaceRows: [
        {
          'index': row.rows[0].index,
          'fields': {
            member6: "",
            userID6: "",
            class6: ""
          }
        }
      ]
    }); 
  }
  
  else if (row.rows[0].fields.userID7 == userID && row.rows[0].fields.class7 == selectedClass) {
    await lib.googlesheets.query['@0.3.0'].replace({
      range: range,
      bounds: 'FULL_RANGE',
      replaceRows: [
        {
          'index': row.rows[0].index,
          'fields': {
            member7: "",
            userID7: "",
            class7: ""
          }
        }
      ]
    }); 
  }
  
  
  
  var row = await lib.googlesheets.query['@0.3.0'].select({
    range: range,
    bounds: 'FULL_RANGE',
    where: [
      {
        'messageID__is': context.params.event.message_id
      }
    ],
    limit: {
      'count': 0,
      'offset': 0
    }
  });

  var members = [];
  var availableSpots = row.rows[0].fields.memberCount;
  
  if (row.rows[0].fields.member0) {
    availableSpots--;
    members.push({
      "name": row.rows[0].fields.member0,
      "value": row.rows[0].fields.class0,
      "inline": true
    });
  }
  
  if (row.rows[0].fields.member1) {
    availableSpots--;
    members.push({
      "name": row.rows[0].fields.member1,
      "value": row.rows[0].fields.class1,
      "inline": true
    });
  }
  
  if (row.rows[0].fields.member2) {
    availableSpots--;
    members.push({
      "name": row.rows[0].fields.member2,
      "value": row.rows[0].fields.class2,
      "inline": true
    });
  }
  
  if (row.rows[0].fields.member3) {
    availableSpots--;
    members.push({
      "name": row.rows[0].fields.member3,
      "value": row.rows[0].fields.class3,
      "inline": true
    });
  }
  
  if (row.rows[0].fields.member4) {
    availableSpots--;
    members.push({
      "name": row.rows[0].fields.member4,
      "value": row.rows[0].fields.class4,
      "inline": true
    });
  }
  
  if (row.rows[0].fields.member5) {
    availableSpots--;
    members.push({
      "name": row.rows[0].fields.member5,
      "value": row.rows[0].fields.class5,
      "inline": true
    });
  }
  
  if (row.rows[0].fields.member6) {
    availableSpots--;
    members.push({
      "name": row.rows[0].fields.member6,
      "value": row.rows[0].fields.class6,
      "inline": true
    });
  }
  
  if (row.rows[0].fields.member7) {
    availableSpots--;
    members.push({
      "name": row.rows[0].fields.member7,
      "value": row.rows[0].fields.class7,
      "inline": true
    });
  }
  
  var fields = [
    {
      "name": "Date",
      "value": row.rows[0].fields.eventDate,
      "inline": true
    },
    {
      "name": "Hour",
      "value": row.rows[0].fields.eventHour,
      "inline": true
    },
    {
      "name": "Starts in:",
      "value": eventTime,
      "inline": true
    },
    {
      "name": "---------------------------",
      "value": "Available Spots: " + availableSpots
    }
  ];
  
  fields = fields.concat(members);
     
  
  await lib.discord.channels['@0.3.0'].messages.update({
    "message_id": row.rows[0].fields.messageID, // required
    "channel_id": row.rows[0].fields.channelID, // required
    "content": "",
    "tts": false,
    "embeds": [
      {
        "type": "rich",
        "color": row.rows[0].fields.color,
        "title": row.rows[0].fields.eventName,
        "description": "Created by " + row.rows[0].fields.author,
        "fields": fields
      }
    ]
  });
  
};

function selectClass(emoji)  {
  var selected;
  if (emoji == "artillerist") {
    selected = "<:artillerist:938105970138173470> Artillerist";
  } else if (emoji == "bard") {
    selected = "<:bard:938107418066419733> Bard";
  } else if (emoji == "berserker") {
    selected = "<:berserker:938107473729056768> Berserker";
  } else if (emoji == "deadeye") {
    selected = "<:deadeye:938107519941890178> Deadeye";
  } else if (emoji == "deathblade") {
    selected = "<:deathblade:938107567643697163> Deathblade";
  } else if (emoji == "gunlance") {
    selected = "<:gunlance:938107654616809543> Gunlancer";
  } else if (emoji == "gunslinger") {
    selected = "<:gunslinger:938109917368320040> Gunslinger";
  } else if (emoji == "paladin") {
    selected = "<:paladin:938107700745764904> Paladin";
  } else if (emoji == "scrapper") {
    selected = "<:scrapper:938107738758709309> Scrapper";
  } else if (emoji == "shadowhunter") {
    selected = "<:shadowhunter:938107785672024074> Shadowhunter";
  } else if (emoji == "sharpshooter") {
    selected = "<:sharpshooter:938107892891009054> Sharpshooter";
  } else if (emoji == "sorceress") {
    selected = "<:sorceress:938107930639728730> Sorceress";
  } else if (emoji == "soulfist") {
    selected = "<:soulfist:938107984880488458> Soulfist";
  } else if (emoji == "striker") {
    selected = "<:striker:938108033177911396> Striker";
  } else if (emoji == "wardancer") {
    selected = "<:wardancer:938108072554025050> Wardancer";
  }
  
  return selected;
}
