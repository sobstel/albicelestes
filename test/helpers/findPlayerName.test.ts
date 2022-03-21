import { findPlayerName } from "~/helpers";
import { Match } from "~/types";

describe("findPlayerName", () => {
  const matches: Pick<Match, "teams" | "lineups">[] = [
    {
      teams: [{ name: "Argentina" }, { name: "Poland" }],
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
      teams: [{ name: "Uruguay" }, { name: "Argentina" }],
      lineups: [
        [{ name: "Diego Forlán" }, { name: "Luis Suárez" }],
        [{ name: "Maxi Rodríguez" }, { name: "Gabriel Batistua" }],
      ],
    },
  ];

  it("returns a player name", () => {
    expect(findPlayerName(matches, "maxi-rodriguez")).toEqual("Maxi Rodríguez");
    expect(findPlayerName(matches, "javier-mascherano")).toEqual(
      "Javier Mascherano"
    );
  });
});
