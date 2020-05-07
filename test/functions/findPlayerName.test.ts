import { findPlayerName } from "functions";
import { Match } from "types";

describe("findPlayerName", () => {
  const matches = [
    {
      lineups: [
        [
          { id: "lm", name: "Leo Messi" },
          { id: "jm", name: "Javier Mascherano" },
          { id: "jrr", name: "Juan Román Riquelme" },
        ],
        [
          { id: "jb", name: "Kuba Błaszczykowski" },
          { id: "rl", name: "Robert Lewandowski" },
        ],
      ],
    },
    {
      lineups: [
        [
          { id: "df", name: "Diego Forlán" },
          { id: "ls", name: "Luis Suárez" },
        ],
        [
          { id: "mr", name: "Maxi Rodríguez" },
          { id: "gb", name: "Gabriel Batistua" },
        ],
      ],
    },
  ] as Pick<Match, "lineups">[];

  it("returns a player name", () => {
    expect(findPlayerName(matches, "mr")).toEqual("Maxi Rodríguez");
    expect(findPlayerName(matches, "jm")).toEqual("Javier Mascherano");
  });
});
