import { collectPlayers } from "functions";
import { Match } from "types";

describe("collectPlayers", () => {
  const matches = [
    {
      lineups: [
        [
          { id: "lm", name: "Leo Messi" },
          { id: "jm", name: "Javier Mascherano" },
        ],
        [],
      ],
      goals: [[{ id: "lm", name: "Leo Messi", min: "56", type: "G" }], []],
    },
    {
      lineups: [
        [],
        [
          { id: "lm", name: "Leo Messi", out: "75" },
          { id: "mr", name: "Maxi Rodríguez", in: "75" },
        ],
      ],
      goals: [
        [],
        [
          { id: "lm", name: "Leo Messi", min: "12", type: "P" },
          { id: "mr", name: "Maxi Rodríguez", min: "80", type: "G" },
        ],
      ],
    },
    {
      lineups: [[{ id: "lm", name: "Leo Messi" }], []],
      goals: [[], []],
    },
  ] as Pick<Match, "lineups" | "goals">[];

  it("returns players with stats", () => {
    expect(collectPlayers(matches)).toEqual([
      { id: "lm", name: "Leo Messi", mp: 3, g: 2, si: 0, so: 1 },
      { id: "jm", name: "Javier Mascherano", mp: 1, g: 0, si: 0, so: 0 },
      { id: "mr", name: "Maxi Rodríguez", mp: 1, g: 1, si: 1, so: 0 },
    ]);
  });
});
