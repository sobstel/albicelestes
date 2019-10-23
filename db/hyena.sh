#!/usr/bin/env node

const fs = require("fs");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const jsonFile = `${__dirname}/hyena.json`;
const adapter = new FileSync(jsonFile);
const db = low(adapter);
const program = require("commander");
const axios = require("axios");

program.option("-y --year <year>", "Year").parse(process.argv);

const API_URL =
  "https://gf0tywygmf.execute-api.eu-west-2.amazonaws.com/prod/hyena?func=";

const { year } = program;
if (!year) {
  console.error("Year option missing");
  program.help();
}

axios
  .get(`${API_URL}argentina/matches/${year}`)
  .then(function({ data: matches }) {
    Promise.all(
      matches.map(function(match) {
        return axios.get(`${API_URL}matches/${match.match_id}`);
      })
    ).then(function(results) {
      results.map(function({ data: match }) {
        const lastDate = fs.readFileSync(`${__dirname}/.hyena`, "utf8");

        if (!match.ended || match.date <= lastDate) {
          return;
        }

        console.log(`${match.date} ${match.home_name} v ${match.away_name}`);

        db.get("matches")
          .push(match)
          .write();

        const data = JSON.stringify(db.getState());
        fs.writeFileSync(
          `${__dirname}/hyena.js`,
          `export default ${data}`,
          "utf8"
        );

        if (match.date > lastDate) {
          fs.writeFileSync(`${__dirname}/.hyena`, match.date, "utf8");
        }
      });
    });
  });
