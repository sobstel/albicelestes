const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("hyena.json");
const db = low(adapter);
const program = require("commander");
const axios = require("axios");

// Already imported
process.exit();

program.option("-y, --year <year>", "Year", "2019");
program.parse(process.argv);

const API_URL =
  "https://gf0tywygmf.execute-api.eu-west-2.amazonaws.com/prod/hyena?func=";

const { year } = program;

db.defaults({ matches: [] }).write();

axios
  .get(`${API_URL}argentina/matches/${year}`)
  .then(function({ data: matches }) {
    matches.forEach(function(match) {
      axios
        .get(`${API_URL}matches/${match["match_id"]}`)
        .then(function({ data: match }) {
          console.log(`${match.date}: ${match.home_name} - ${match.away_name}`);
          db.get("matches")
            .push(match)
            .write();
        });
    });
  });
