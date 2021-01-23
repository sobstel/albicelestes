import React from "react";
import { TeamItem } from "types";
import { Page, Block, LinkAnchor } from "components/layout";

type Props = { teams: TeamItem[] };

export default function TeamsPage({ teams }: Props) {
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
