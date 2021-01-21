import React from "react";
import { Bibliography } from "types";
import Layout from "components/Layout";
import Section from "components/Layout/Section";
import ExternalLink from "components/Layout/ExternalLink";

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
  return (
    <Layout title={["About"]}>
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
              <ExternalLink href={item.url}>{item.name}</ExternalLink>
            </p>
          );
        })}
      </Section>

      <Section title="See also">
        <p>
          <ExternalLink href="https://github.com/sobstel/albicelestes">
            Source code at GitHub
          </ExternalLink>
        </p>
        <p>
          <ExternalLink href="https://twitter.com/albicelestescom">
            Twitter profile
          </ExternalLink>
        </p>
      </Section>

      <Section title="Created and maintained by">
        <p>
          <ExternalLink href="https://www.sobstel.org">Sopel</ExternalLink>
        </p>
      </Section>
    </Layout>
  );
}
