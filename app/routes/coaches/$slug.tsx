import pluralize from "pluralize";
import React from "react";
import * as R from "remeda";
import { json, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import slugify from "slugify";

import { Header } from "~/components/layout";
import MatchList from "~/components/MatchList";
import { fetchMatches } from "~/data";
import { getMatchTeamIndex } from "~/helpers";
import { getMatchItem } from "~/helpers";
import { Match } from "~/types";
import { seoDescription, seoTitle } from "~/utility";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

function getCoachName(match: Match | undefined) {
  return match?.coaches?.[getMatchTeamIndex(match)]?.name ?? "";
}

function getCoachSlug(name: string) {
  return slugify(name, { lower: true });
}

export async function getLoaderData({
  params: { slug },
}: Parameters<LoaderFunction>[0]) {
  const matches = R.pipe(
    fetchMatches(),
    R.filter((match) => getCoachSlug(getCoachName(match)) === slug)
  );

  const name = getCoachName(R.first(matches));

  return {
    slug,
    name,
    matches: matches.map(getMatchItem),
  };
}

export const loader: LoaderFunction = async (args) => {
  return json<LoaderData>(await getLoaderData(args));
};

export const meta: MetaFunction = ({
  data: { name },
}: {
  data: LoaderData;
}) => {
  return {
    title: seoTitle([name, "Coaches"]),
    description: seoDescription([name]),
  };
};

export default function CoachPage() {
  const { name, matches } = useLoaderData<LoaderData>();
  return (
    <>
      <Header text={name} top />
      <MatchList matches={matches} />
    </>
  );
}
