import { collectTeams } from "functions";
import { Match } from "types";

describe("collectTeams", () => {
  const matches = [
    {
      teams: [{ name: "Argentina" }, { name: "Ecuador" }],
    },
    {
      teams: [{ name: "West Germany", slug: "germany" }, { name: "argentina" }],
    },
    {
      teams: [{ name: "Ecuador" }, { name: "argentina" }],
    },
    {
      teams: [{ name: "Argentina" }, { name: "Uruguay" }],
    },
  ] as Pick<Match, "teams">[];

  it("returns list of team items", () => {
    expect(collectTeams(matches)).toEqual([
      { slug: "uruguay", name: "Uruguay", mp: 1 },
      { slug: "ecuador", name: "Ecuador", mp: 2 },
      { slug: "germany", name: "West Germany", mp: 1 },
    ]);
  });
});
