const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("hyena.json");
const db = low(adapter);
const program = require("commander");
const axios = require("axios");

program.option("-y, --year <year>", "Year", "2019");
program.parse(process.argv);

const API_URL =
  "https://gf0tywygmf.execute-api.eu-west-2.amazonaws.com/prod/hyena?func=";

const { year } = program;

db.defaults({ matches: [] }).write();

function importMatches(matches) {
  matches.forEach(function(match) {
    db.get("matches")
      .push(match)
      .write();
  });
}

axios.get(`${API_URL}argentina/matches/${year}`).then(function({ data }) {
  importMatches(data);
});
