import { NextApiRequest, NextApiResponse } from "next";

// @ts-ignore
import low from "lowdb";
// @ts-ignore
import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync("./db/hyena.json");
const db = low(adapter);

type PartialMatch = {
  macth_id: string;
  date: string;
  time: string;
  home_name: string;
  away_name: string;
  ft?: [];
};

export default function handle(_req: NextApiRequest, res: NextApiResponse) {
  // TODO: limit by start year and end year
  // res.json({ archive: req.query });

  res.json({ archive: "test" });

  // const archive = db
  //   .get("matches")
  //   .map((match: any) =>
  //     db._.pick(match, [
  //       "match_id",
  //       "date",
  //       "time",
  //       "home_name",
  //       "away_name",
  //       "ended",
  //       "ft"
  //     ])
  //   )
  //   .reverse()
  //   .reduce((grouped: any[], match: PartialMatch) => {
  //     const year = parseInt(match["date"].substring(0, 4), 10);
  //     let groupIndex = db._.findIndex(grouped, ["year", year]);
  //     if (groupIndex === -1) {
  //       const groupedLength = grouped.push({ year: year, matches: [] });
  //       groupIndex = groupedLength - 1;
  //     }
  //     grouped[groupIndex].matches.push(match);
  //     return grouped;
  //   }, [])
  //   .value();

  // res.json({ archive });
}
