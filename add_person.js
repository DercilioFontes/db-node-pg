const pg = require("pg");
const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});

const firstName = process.argv[2];
const lastName = process.argv[3];
const birthdate = process.argv[4];

console.log("Adding ...");

knex('famous_people').insert([
  {'first_name': firstName,
    'last_name': lastName,
    'birthdate': birthdate}
  ]).finally(function() {
  knex.destroy();
});

console.log("Added");