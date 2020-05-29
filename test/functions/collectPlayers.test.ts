import { collectPlayers } from "functions";
import { Match } from "types";

describe("collectPlayers", () => {
  const matches = [
    {
      teams: [{ name: "Argentina" }, { name: "Uruguay" }],
      lineups: [[{ name: "Leo Messi" }, { name: "Javier Mascherano" }], []],
      goals: [[{ name: "Leo Messi", min: "56", type: "G" }], []],
    },
    {
      teams: [{ name: "Uruguay" }, { name: "Argentina" }],
      lineups: [
        [],
        [
          { name: "Leo Messi", out: "75" },
          { name: "Maxi Rodríguez", in: "75" },
        ],
      ],
      goals: [
        [],
        [
          { name: "Leo Messi", min: "12", type: "P" },
          { name: "Maxi Rodríguez", min: "80", type: "G" },
        ],
      ],
    },
    {
      teams: [{ name: "Argentina" }, { name: "Uruguay" }],
      lineups: [[{ name: "Leo Messi" }], []],
      goals: [[], []],
    },
  ] as Pick<Match, "teams" | "lineups" | "goals">[];

  function happyPath(testMatches: typeof matches) {
    expect(collectPlayers(testMatches)).toEqual([
      { name: "Leo Messi", mp: 3, g: 2, si: 0, so: 1 },
      { name: "Javier Mascherano", mp: 1, g: 0, si: 0, so: 0 },
      { name: "Maxi Rodríguez", mp: 1, g: 1, si: 1, so: 0 },
    ]);
  }

  it("returns players with stats", () => {
    happyPath(matches);
  });

  it("does not include goals", () => {
    const localMatches = [
      ...matches,
      {
        teams: [{ name: "Argentina" }, { name: "Brazil" }],
        lineups: [[], []],
        goals: [[{ name: "Dino", min: "10", type: "OG" }], []],
      },
    ] as typeof matches;

    happyPath(localMatches);
  });
});
