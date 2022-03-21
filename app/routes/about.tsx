import React from "react";
import { json, MetaFunction, useLoaderData } from "remix";

import { Block, Header, LinkAnchor, Page } from "~/components/layout";
import { fetchBibliography, fetchMatches } from "~/data";
import { collectPlayers, collectTeams } from "~/helpers";
import { seoTitle } from "~/utility";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

async function getLoaderData() {
  const matches = fetchMatches();
  const bibliography = fetchBibliography();

  const playersTotal = collectPlayers(matches).length;
  const teamsTotal = collectTeams(matches).length;

  return {
    stat: {
      matchesTotal: matches.length,
      playersTotal,
      teamsTotal,
    },
    bibliography,
  };
}

export const loader = async () => {
  return json<LoaderData>(await getLoaderData());
};

export const meta: MetaFunction = () => {
  return {
    title: seoTitle(["About"]),
  };
};

export default function AboutPage() {
  const { stat, bibliography } = useLoaderData<LoaderData>();

  return (
    <Page>
      <Header top text="About" />
      <p>Argentina Football National Team Archive</p>

      <Block>
        <Header text="Status" />
        <p>
          Matches (inc. suspended): {stat.matchesTotal} (
          <LinkAnchor href="/status">verification status</LinkAnchor>)
        </p>
        <p>Argentina players: {stat.playersTotal}</p>
        <p>Rival teams: {stat.teamsTotal}</p>
      </Block>

      <Block>
        <Header text="Links" />
        <p>
          <LinkAnchor href="https://golazon.com/t/03l">golazon</LinkAnchor>
        </p>
        <p>
          <LinkAnchor href="https://github.com/sobstel/albicelestes">
            github
          </LinkAnchor>
        </p>
        <p>
          <LinkAnchor href="https://twitter.com/albisopel">twitter</LinkAnchor>
        </p>
        <p>
          <LinkAnchor href="https://www.youtube.com/channel/UCtBjQEaQFBAwJjkZxvciCUw">
            youtube
          </LinkAnchor>
        </p>
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
