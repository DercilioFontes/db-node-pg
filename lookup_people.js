const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const searchWord = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching ...")
  client.query(`SELECT * FROM famous_people WHERE last_name LIKE $1::text`, [searchWord], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    const id = result.rows[0].id;
    const first_name = result.rows[0].first_name;
    const last_name = result.rows[0].last_name;
    const birthdate = result.rows[0].birthdate;

    console.log(`- ${id}: ${first_name} ${last_name}, born '${birthdate.toLocaleDateString()}'`);
    client.end();
  });
});