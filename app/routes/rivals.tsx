import pluralize from "pluralize";
import React from "react";
import * as R from "remeda";
import { json, MetaFunction, useLoaderData } from "remix";

import { Block, LinkAnchor } from "~/components/layout";
import { fetchMatches } from "~/data";
import {
  collectTeams,
  getMatchDate,
  getMatchTeams,
  rejectSuspendedMatches,
} from "~/helpers";
import { seoDescription, seoTitle } from "~/utility";

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

export const meta: MetaFunction = ({
  data: { teams },
}: {
  data: LoaderData;
}) => {
  return {
    title: seoTitle(["Argentina football rivalry", "Head-to-Head"]),
    description: seoDescription([
      R.pipe(
        teams,
        R.sortBy((team) => -team.mp),
        R.take(20),
        R.map((team) => `${team.name} (${team.mp})`)
      ).join(", "),
    ]),
  };
};

export default function RivalIndexPage() {
  const { teams } = useLoaderData<LoaderData>();
  return (
    <>
      <Block>
        {teams.map(({ name, slug, mp }) => (
          <p key={slug}>
            <LinkAnchor href={`/rivals/${slug}`} important={!!mp && mp >= 10}>
              {name}
            </LinkAnchor>{" "}
            ({mp})
          </p>
        ))}
      </Block>
    </>
  );
}
