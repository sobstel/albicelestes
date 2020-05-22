import { findPlayerName } from "functions";
import { Match } from "types";

describe("findPlayerName", () => {
  const matches = [
    {
      lineups: [
        [
          { name: "Leo Messi" },
          { name: "Javier Mascherano" },
          { name: "Juan Román Riquelme" },
        ],
        [{ name: "Kuba Błaszczykowski" }, { name: "Robert Lewandowski" }],
      ],
    },
    {
      lineups: [
        [{ name: "Diego Forlán" }, { name: "Luis Suárez" }],
        [{ name: "Maxi Rodríguez" }, { name: "Gabriel Batistua" }],
      ],
    },
  ] as Pick<Match, "lineups">[];

  it("returns a player name", () => {
    expect(findPlayerName(matches, "maxi-rodriguez")).toEqual("Maxi Rodríguez");
    expect(findPlayerName(matches, "javier-mascherano")).toEqual(
      "Javier Mascherano"
    );
  });
});
