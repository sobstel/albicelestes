import collectTeams from "functions/collectTeams";

describe("collectTeams", () => {
  const matches = [
    {
      teams: [
        { slug: "argentina", name: "Argentina" },
        { slug: "ecuador", name: "Ecuacdor" },
      ],
    },
    {
      teams: [
        { slug: "west-germany", name: "Germany" },
        { slug: "argentina", name: "argentina" },
      ],
    },
    {
      teams: [
        { slug: "ecuador", name: "Ecuacdor" },
        { slug: "argentina", name: "argentina" },
      ],
    },
    {
      teams: [
        { slug: "argentina", name: "Argentina" },
        { slug: "uruguay", name: "Uruguay" },
      ],
    },
  ] as Pick<Match, "teams">[];

  it("returns list of team items", () => {
    expect(collectTeams(matches)).toEqual([
      { slug: "uruguay", name: "Uruguay", mp: 1 },
      { slug: "ecuador", name: "Ecuacdor", mp: 2 },
      { slug: "west-germany", name: "Germany", mp: 1 },
    ]);
  });
});
