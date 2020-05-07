import { findTeamName } from "functions";
import { Match } from "types";

describe("findTeamName", () => {
  const matches = [
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
  ] as Pick<Match, "teams">[];

  it("returns a team name", () => {
    expect(findTeamName(matches, "paraguay")).toEqual("Paraguay");
    expect(findTeamName(matches, "poland")).toEqual("Poland");
  });
});
