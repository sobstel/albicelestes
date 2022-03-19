import { collectPlayerStat } from "~/helpers";
import { Result } from "~/types";

describe("collectPlayerStat", () => {
  const matches: Parameters<typeof collectPlayerStat>[0] = [
    {
      teams: [{ name: "Argentina" }, { name: "Brazil" }],
      goals: [[{ name: "Javier Zanetti", type: "P" }], []],
      cards: [
        [
          { name: "Javier Zanetti", type: "Y" },
          { name: "Javier Zanetti", type: "R" },
        ],
        [],
      ],
      lineups: [
        [{ name: "Javier Mascherano" }, { name: "Javier Zanetti", in: "46" }],
        [],
      ],
      result: Result.Win,
    },
    {
      teams: [{ name: "England" }, { name: "Argentina" }],
      goals: [[], [{ name: "Javier Zanetti", type: "G", min: "45" }]],
      cards: [[], [{ name: "Javier Zanetti", type: "Y" }]],
      lineups: [
        [{ name: "David Beckham" }],
        [{ name: "Diego Simeone" }, { name: "Javier Zanetti" }],
      ],
      result: Result.Win,
    },
    {
      teams: [{ name: "Bolivia" }, { name: "Argentina" }],
      goals: [[], []],
      lineups: [[], [{ name: "Javier Zanetti" }]],
      result: Result.Suspended,
    },
    {
      teams: [{ name: "Peru" }, { name: "Argentina" }],
      goals: [[], []],
      lineups: [[], [{ name: "Javier Zanetti", out: "75" }]],
      result: Result.Win,
    },
    {
      teams: [{ name: "Argentina" }, { name: "Germany" }],
      goals: [
        [
          { name: "Lionel Messi", type: "G" },
          { name: "Javier Mascherano", type: "G" },
        ],
        [],
      ],
      lineups: [[{ name: "Lionel Messi" }, { name: "Javier Mascherano" }], []],
      result: Result.Win,
    },
  ];

  it("works correctly", () => {
    expect(collectPlayerStat(matches, "javier-zanetti")).toEqual({
      mp: 3,
      si: 1,
      so: 1,
      g: 2,
      yc: 2,
      rc: 1,
    });
  });
});
