const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const range = "A:AF";

var limit = await lib.utils.kv['@0.1.16'].get({
  key: `itemCount`,
});

var row = await lib.googlesheets.query['@0.3.0'].select({
  range: range,
  bounds: 'FULL_RANGE',
  where: [{}],
  limit: {
    'count': limit,
    'offset': 0
  }
});

var currentTime = new Date().valueOf();

var maxIndex = 1;

for (let i = 0; i < row.rows.length; i++) {
  var dateNumbers = row.rows[i].fields.eventDate.split('.');
  var hourNumbers = row.rows[i].fields.eventHour.split(':');

  var timeInEpoch = new Date(dateNumbers[2], dateNumbers[1] - 1, dateNumbers[0], hourNumbers[0], hourNumbers[1]).valueOf();
  timeInEpoch -= 60 * 60 * 1000;
  
  if (currentTime > timeInEpoch) {

    var response = await lib.googlesheets.query['@0.3.0'].delete({
      range: range,
      bounds: 'FULL_RANGE',
      where: [
        {
          'messageID__is': row.rows[i].fields.messageID
        }
      ],
      limit: {
        'count': limit,
        'offset': 0
      }
    });
    
    await lib.discord.channels['@0.3.0'].messages.destroy({
      message_id: row.rows[i].fields.messageID,
      channel_id: row.rows[i].fields.channelID
    });
  }
  
  else {
    if (row.rows[i].fields.eventName != '') {
      maxIndex = row.rows[i].index;
    }
  }
}

await lib.utils.kv['@0.1.16'].set({
  key: `itemCount`,
  value: maxIndex - 1
});




