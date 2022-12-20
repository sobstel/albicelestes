import CountryCodeInfo from "country-code-info";
import React from "react";
import * as R from "remeda";

import MatchScore from "~/components/MatchScore";
import { fetchCompetitionInflections, fetchTeamInflections } from "~/data";
import { getMatchDate, getMatchSlug, getMatchYear } from "~/helpers";
import getMatchTeamIndex from "~/helpers/getMatchTeamIndex";
import { MatchItem } from "~/types";

import { Block, LinkAnchor } from "./layout";

const competitionInflections = fetchCompetitionInflections();
const teamInflections = fetchTeamInflections();

const Date = ({ match }: { match: MatchItem }) => {
  return <>{getMatchDate(match, { withYear: true })}</>;
};

const Teams = ({ match }: { match: MatchItem }) => {
  const homeTeamName =
    teamInflections[match.teams[0].name] ?? match.teams[0].name;
  const homeCountry = CountryCodeInfo.findCountry({
    name: match.teams[0].name,
  });

  const awayTeamName =
    teamInflections[match.teams[1].name] ?? match.teams[1].name;
  const awayCountry = CountryCodeInfo.findCountry({
    name: match.teams[1].name,
  });

  return (
    <LinkAnchor href={`/${getMatchYear(match)}/${getMatchSlug(match)}`}>
      <span className="md:hidden inline">
        {homeCountry?.fifa ?? homeTeamName} -{" "}
        {awayCountry?.fifa ?? awayTeamName}
      </span>
      <span className="hidden md:inline">
        {homeTeamName} - {awayTeamName}
      </span>
    </LinkAnchor>
  );
};

type Props = {
  matches: Array<MatchItem>;
};

export default function MatchList({ matches }: Props) {
  if (matches.length === 0) {
    return (
      <Block>
        <p>No matches found</p>
      </Block>
    );
  }

  const hasUnverifiedMatches = R.find(matches, (match) => !match.sources);

  return (
    <Block>
      <div className="max-w-full overflow-hidden">
        <table>
          <tbody>
            {matches.map((match) => (
              <tr key={`${getMatchYear(match)}-${getMatchSlug(match)}`}>
                <td>
                  <Date match={match} /> {!match.sources && <sup>*</sup>}
                </td>
                <td>
                  <Teams match={match} />
                </td>
                <td className="text-center">
                  <MatchScore match={match} />
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
        {hasUnverifiedMatches && (
          <p className="mt-4 text-xs italic">
            <sup>*</sup> Data might not be fully accurate. It needs to be
            verified with reliable sources. Want to help? Contact me at
            przemek&#64;sobstel&#46;org.
          </p>
        )}
      </div>
    </Block>
  );
}
