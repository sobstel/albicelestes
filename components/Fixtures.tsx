import React from "react";
import {
  getMatchDate,
  getMatchYear,
  getMatchScore,
  getMatchSlug,
} from "helpers";
import { MatchItem } from "types";
import { fetchTeamInflections, fetchCompetitionInflections } from "data";
import { Block, Header, LinkAnchor } from "./layout";

export type FixtureMatch = MatchItem;

type Props = {
  title?: string; // DEPREACTED
  matches?: FixtureMatch[];
  headerText?: string;
};

const competitionInflections = fetchCompetitionInflections();
const teamInflections = fetchTeamInflections();

export default function Fixtures({ title, matches, headerText }: Props) {
  if (!matches?.length) return null;

  return (
    <Block>
      {headerText && <Header text={headerText} />}
      {title && <Header text={title} />}
      <div className="max-w-full overflow-hidden">
        <table>
          <tbody>
            {matches.map((match) => (
              <tr key={`${getMatchYear(match)}-${getMatchSlug(match)}`}>
                <td>{getMatchDate(match, { withYear: true })}</td>
                <td>
                  <LinkAnchor
                    href={`/${getMatchYear(match)}/${getMatchSlug(match)}`}
                  >{`${
                    teamInflections[match.teams[0].name] ?? match.teams[0].name
                  } - ${
                    teamInflections[match.teams[1].name] ?? match.teams[1].name
                  }`}</LinkAnchor>
                </td>
                <td>
                  {getMatchScore(match, { withTeams: false, short: true })}
                </td>
                <td>
                  <em>
                    {competitionInflections[match.competition] ??
                      match.competition}
                  </em>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Block>
  );
}
