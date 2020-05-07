import { collectCompetitions } from "functions";
import { Match } from "types";

describe("collectCompetitions", () => {
  const matches = [
    { date: "1986-06-29", competition: "World Cup" },
    { date: "1993-07-04", competition: "Copa America" },
    { date: "2017-07-13", competition: "Friendly" },
    { date: "2017-08-31", competition: "World Cup Quals" },
  ] as Pick<Match, "date" | "competition">[];

  it("returns list of important competitions names", () => {
    expect(collectCompetitions(matches)).toEqual([
      "World Cup 1986",
      "Copa America 1993",
    ]);
  });
});
