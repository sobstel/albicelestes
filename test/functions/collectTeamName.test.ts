import collectTeamName from "functions/collectTeamName";

describe("collectTeamName", () => {
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
    expect(collectTeamName(matches, "paraguay")).toEqual("Paraguay");
    expect(collectTeamName(matches, "poland")).toEqual("Poland");
  });
});
