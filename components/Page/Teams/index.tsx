import React from "react";
import { TeamItem } from "types";
import Layout from "components/Layout";
import Link from "components/Layout/Link";
import Header from "components/Layout/Header";
import Section from "components/Layout/Section";

type Props = { teams: TeamItem[] };

export default function TeamsPage({ teams }: Props) {
  return (
    <Layout title={["Argentina football rivalry", "Head-to-Head"]}>
      <Section>
        {teams.map(({ name, slug, mp }) => (
          <p key={slug}>
            <Link href={`/teams/${slug}`} important={!!mp && mp >= 10}>
              {name}
            </Link>{" "}
            ({mp})
          </p>
        ))}
      </Section>
    </Layout>
  );
}
