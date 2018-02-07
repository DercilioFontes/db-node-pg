const pg = require("pg");
const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const searchWord = process.argv[2];

// Outputs Seach Results
function outputResults(rows) {

  console.log(`Found ${rows.length} person(s) by the name '${searchWord}':`);

  rows.forEach( function(row) {
    const id = row.id;
    const firstName = row.first_name;
    const lastName = row.last_name;
    const birthdate = row.birthdate;

    console.log(`- ${id}: ${firstName} ${lastName}, born '${birthdate.toLocaleDateString()}'`);
  
  });
}

knex.select().from('famous_people')
  .where('first_name', searchWord)
  .orWhere('last_name', searchWord)
  .asCallback(function(err, rows){
    if (err) return console.error(err);
    outputResults(rows);
  }).finally(function() {
    knex.destroy();
  });