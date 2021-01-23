import React from "react";
import * as R from "remeda";
import { collectTeams, rejectSuspendedMatches } from "helpers";
import { Page, Block, LinkAnchor } from "components/layout";
import { fetchMatches } from "data";
import { TeamItem } from "types";

export async function getStaticProps() {
  const teams = R.pipe(
    fetchMatches(),
    rejectSuspendedMatches,
    collectTeams,
    R.sortBy((team) => team.name)
  );

  return { props: { teams } };
}

type Props = { teams: TeamItem[] };

export default function TeamIndexPage({ teams }: Props) {
  return (
    <Page title={["Argentina football rivalry", "Head-to-Head"]}>
      <Block>
        {teams.map(({ name, slug, mp }) => (
          <p key={slug}>
            <LinkAnchor href={`/teams/${slug}`} important={!!mp && mp >= 10}>
              {name}
            </LinkAnchor>{" "}
            ({mp})
          </p>
        ))}
      </Block>
    </Page>
  );
}
