import { findTeamName } from "~/helpers";
import { Match } from "~/types";

describe("findTeamName", () => {
  const matches: Pick<Match, "teams">[] = [
    {
      teams: [
        { slug: "argentina", name: "Argentina" },
        { slug: "paraguay", name: "Paraguay" },
      ],
    },
    {
      teams: [
        { slug: "poland", name: "Poland" },
        { slug: "argentina", name: "argentina" },
      ],
    },
  ];

  it("returns a team name", () => {
    expect(findTeamName(matches, "paraguay")).toEqual("Paraguay");
    expect(findTeamName(matches, "poland")).toEqual("Poland");
  });
});
