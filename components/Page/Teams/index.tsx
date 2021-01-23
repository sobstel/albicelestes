import React from "react";
import { TeamItem } from "types";
import Layout from "components/Layout/Page";
import { LinkAnchor } from "components/Layout";
import Section from "components/Layout/Section";

type Props = { teams: TeamItem[] };

export default function TeamsPage({ teams }: Props) {
  return (
    <Layout title={["Argentina football rivalry", "Head-to-Head"]}>
      <Section>
        {teams.map(({ name, slug, mp }) => (
          <p key={slug}>
            <LinkAnchor href={`/teams/${slug}`} important={!!mp && mp >= 10}>
              {name}
            </LinkAnchor>{" "}
            ({mp})
          </p>
        ))}
      </Section>
    </Layout>
  );
}
