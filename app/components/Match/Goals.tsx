import React, { Fragment } from "react";
import * as R from "remeda";

import { Block, Header } from "~/components/layout";
import PlayerName from "~/components/PlayerName";
import { produceIndexedEvents } from "~/helpers";
import { getMatchTeamIndex, sortByMinute } from "~/helpers";
import { Match } from "~/types";
import { xor } from "~/utility";

type Props = { match: Pick<Match, "goals" | "lineups" | "teams"> };

export default function Goals({ match }: Props) {
  const goals = R.pipe(
    match.goals,
    produceIndexedEvents,
    R.flatten(),
    sortByMinute,
    (goals) => {
      const currentScore = [0, 0];
      return goals.map((goal) => {
        currentScore[goal.teamIndex] += 1;
        return { ...goal, score: [currentScore[0], currentScore[1]] };
      });
    }
  );

  if (goals.length === 0) {
    return null;
  }

  const myTeamIndex = getMatchTeamIndex(match);

  const hasIncompleteData = goals.some((goal) => !goal.min);
  if (hasIncompleteData) {
    return (
      <Block>
        <Header text="Goals" />
        {match.goals.map((_teamGoals, teamIndex) => (
          <p key={teamIndex}>
            {match.teams[teamIndex].name.slice(0, 3).toUpperCase()}:{" "}
            {match.goals[teamIndex].map((goal, index) => (
              <Fragment key={`${teamIndex}-${index}`}>
                <PlayerName key={index} name={goal.name} linkify={false} />
                {goal.min && ` ${goal.min}'`}
                {index < match.goals[teamIndex].length - 1 && ", "}
              </Fragment>
            ))}
          </p>
        ))}
      </Block>
    );
  }

  return (
    <Block>
      <Header text="Goals" />
      {goals.map((goal, index) => (
        <p key={index}>
          {goal.min && `${goal.score.join(":")} `}
          <PlayerName
            name={goal.name}
            linkify={xor(goal.teamIndex === myTeamIndex, goal.type === "OG")}
          />
          {goal.min && ` ${goal.min}'`}
          {goal.type !== "G" && ` [${goal.type}]`}
        </p>
      ))}
    </Block>
  );
}
