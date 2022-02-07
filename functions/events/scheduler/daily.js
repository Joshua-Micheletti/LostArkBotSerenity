// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const range = "A:AF";

var row = await lib.googlesheets.query['@0.3.0'].select({
  range: range,
  bounds: 'FULL_RANGE',
  where: [{}],
  limit: {
    'count': 0,
    'offset': 0
  }
});

var currentTime = new Date().valueOf();

for (let i = 0; i < row.rows.length; i++) {
  console.log(i);
  
  var dateNumbers = row.rows[i].fields.eventDate.split('.');
  var hourNumbers = row.rows[i].fields.eventHour.split(':');

  var timeInEpoch = new Date(dateNumbers[2], dateNumbers[1] - 1, dateNumbers[0], hourNumbers[0], hourNumbers[1]).valueOf();
  timeInEpoch -= 60 * 60 * 1000;
  
  console.log("Event time: " + timeInEpoch);
  console.log("Current time: " + currentTime);
  
  console.log("Event: " + row.rows[i].fields.eventDate + " " + row.rows[i].fields.eventHour);
  console.log("Event in utc: " + new Date(timeInEpoch));
  console.log("Current time: " + new Date());
  
  if (currentTime > timeInEpoch) {
    console.log("> EXPIRED");
    console.log(row.rows[i].fields.messageID);

    var response = await lib.googlesheets.query['@0.3.0'].delete({
      range: range,
      bounds: 'FULL_RANGE',
      where: [
        {
          'messageID__is': row.rows[i].fields.messageID
        }
      ],
      limit: {
        'count': 0,
        'offset': 0
      }
    });
    
    
    await lib.discord.channels['@0.3.0'].messages.destroy({
      message_id: row.rows[i].fields.messageID,
      channel_id: row.rows[i].fields.channelID
    });
  }
}




