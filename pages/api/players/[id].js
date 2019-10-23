import db from "../../../lib/db";

export default function handle(req, res) {
  const { id } = req.query;

  const matches = db
    .get("matches")
    .filter(match => {
      return (
        (match["home_players"] &&
          db._.find(match["home_players"], ["person_id", id])) ||
        (match["away_players"] &&
          db._.find(match["away_players"], ["person_id", id]))
      );
    })
    .map(match =>
      db._.pick(match, [
        "match_id",
        "date",
        "time",
        "home_name",
        "away_name",
        "ended",
        "ft"
      ])
    )
    .reverse()
    .value();

  res.json({ matches });
}
