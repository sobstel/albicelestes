import React from "react";
import { TeamItem } from "types";
import Layout from "components/Layout";
import Link from "components/Layout/Link";
import Header from "components/Layout/Header";

type Props = { teams: TeamItem[] };

export default function TeamsPage({ teams }: Props) {
  return (
    <Layout title={["Argentina footbal rivalry", "Head-to-Head"]}>
      <Header text="Teams" />
      {teams.map(({ name, slug, mp }) => (
        <p key={slug}>
          <Link
            href="/teams/[slug]"
            as={`/teams/${slug}`}
            important={!!mp && mp >= 10}
          >
            {name}
          </Link>{" "}
          ({mp})
        </p>
      ))}
    </Layout>
  );
}
