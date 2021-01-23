import * as R from "remeda";
import React from "react";
import { fetchBibliography, fetchMatches } from "data";
import { collectPlayers, collectTeams } from "helpers";
import { Bibliography } from "types";
import { Page, LinkAnchor } from "components/Layout";
import Section from "components/Layout/Section";

export async function getStaticProps() {
  const matches = fetchMatches();
  const verifiedMatches = R.filter(
    matches,
    (match) => !!match.sources && match.sources.length > 0
  );
  const bibliography = fetchBibliography();

  const playersTotal = collectPlayers(matches).length;
  const teamsTotal = collectTeams(matches).length;

  const props: Props = {
    stat: {
      matchesTotal: matches.length,
      matchesVerified: verifiedMatches.length,
      playersTotal,
      teamsTotal,
    },
    bibliography,
  };

  return { props };
}

type Props = {
  bibliography: Bibliography;
  stat: {
    matchesTotal: number;
    matchesVerified: number;
    playersTotal: number;
    teamsTotal: number;
  };
};

export default function PageContainer(props: Props) {
  const { stat, bibliography } = props;
  return (
    <Page title={["About"]}>
      <Section title="About">
        <p>Argentina football national team database</p>
      </Section>

      <Section title="Status">
        <p>
          Matches: {stat.matchesTotal} (verified: {stat.matchesVerified})
        </p>
        <p>Argentina players: {stat.playersTotal}</p>
        <p>Rival teams: {stat.teamsTotal}</p>
      </Section>

      <Section title="Sources">
        {Object.keys(bibliography).map((key) => {
          const item = bibliography[key];
          return (
            <p key={key}>
              <LinkAnchor href={item.url}>{item.name}</LinkAnchor>
            </p>
          );
        })}
      </Section>

      <Section title="Created and maintained by">
        <p>
          <LinkAnchor href="https://www.sobstel.org">Sopel</LinkAnchor>
        </p>
      </Section>
    </Page>
  );
}
