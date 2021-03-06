import * as R from "remeda";
import React from "react";
import { fetchBibliography, fetchMatches } from "data";
import { collectPlayers, collectTeams } from "helpers";
import { Bibliography } from "types";
import { Page, Block, Header, LinkAnchor } from "components/layout";

export async function getStaticProps() {
  const matches = fetchMatches();
  const verifiedMatches = R.filter(matches, (match) =>
    Boolean(match.sources?.length)
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

export default function AboutPage(props: Props) {
  const { stat, bibliography } = props;
  const verifiedRatio = Math.ceil(
    (stat.matchesVerified / stat.matchesTotal) * 100
  );

  return (
    <Page title={["About"]}>
      <Header top text="About" />
      <p>Argentina Football National Team Archive</p>

      <Block>
        <Header text="Status" />
        <p>
          Matches (inc. suspended): {stat.matchesTotal} (verified:{" "}
          {stat.matchesVerified}, ~{verifiedRatio}%)
        </p>
        <p>Argentina players: {stat.playersTotal}</p>
        <p>Rival teams: {stat.teamsTotal}</p>
      </Block>

      <Block>
        <Header text="Sources" />
        {Object.keys(bibliography).map((key) => {
          const item = bibliography[key];
          return (
            <p key={key}>
              {item.url ? (
                <LinkAnchor href={item.url}>{item.name}</LinkAnchor>
              ) : (
                <>{item.name}</>
              )}
            </p>
          );
        })}
      </Block>

      <Block>
        <Header text="Thanks" />
        <p>
          Esteban Bekerman (
          <LinkAnchor href="https://twitter.com/entretiempos_ar">
            Entre Tiempos
          </LinkAnchor>
          )
        </p>
      </Block>

      <Block>
        <Header text="Created and maintained by" />
        <p>
          <LinkAnchor href="https://www.sobstel.org">Sopel</LinkAnchor>
        </p>
      </Block>
    </Page>
  );
}
