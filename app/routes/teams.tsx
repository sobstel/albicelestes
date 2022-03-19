import React from "react";
import * as R from "remeda";
import { json, useLoaderData } from "remix";

import { Block, LinkAnchor, Page } from "~/components/layout";
import { fetchMatches } from "~/data";
import { collectTeams, rejectSuspendedMatches } from "~/helpers";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

export async function getLoaderData() {
  const teams = R.pipe(
    fetchMatches(),
    rejectSuspendedMatches,
    collectTeams,
    R.sortBy((team) => team.name)
  );

  return { teams };
}

export const loader = async () => {
  return json<LoaderData>(await getLoaderData());
};

export default function TeamsPage() {
  const { teams } = useLoaderData<LoaderData>();
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
