import React from "react";
import { render } from "@testing-library/react";
import { Match } from "types";
import MatchPage from "components/Page/Match";

describe(MatchPage, () => {
  const match = {
    date: "2022-06-30",
    competition: "World Cup",
    teams: [
      { slug: "argentina", name: "Argentina" },
      { slug: "uruguay", name: "Uruguay " },
    ],
    score: [3, 1],
    result: "W",
    goals: [[], []],
    cards: [[], []],
    coaches: [null, null],
    lineups: [[], []],
  } as Match;

  test("works", async () => {
    render(<MatchPage match={match} info={{}} />);
  });
});
