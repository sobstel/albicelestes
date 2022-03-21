import { collectTeams } from "~/helpers";
import { Match } from "~/types";

describe("collectTeams", () => {
  const matches: Pick<Match, "teams">[] = [
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
  ];

  it("returns list of team items", () => {
    expect(collectTeams(matches)).toEqual([
      { slug: "uruguay", name: "Uruguay", mp: 1 },
      { slug: "ecuador", name: "Ecuador", mp: 2 },
      { slug: "germany", name: "West Germany", mp: 1 },
    ]);
  });
});
