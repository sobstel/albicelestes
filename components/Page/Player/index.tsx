import React from "react";
import Head from "next/head";
import { MatchItem, PlayerInfo, PlayerStat } from "types";
import { playerCatalog, playerSlug } from "helpers";
import { BASE_URL } from "config";
import Layout from "components/Layout";
import Fixtures from "components/Fixtures";
import Competitions from "components/Competitions";
import Info from "./Info";

export type Props = {
  slug: string;
  name: string;
  stat: PlayerStat;
  competitions: string[];
  matches: MatchItem[];
  info: PlayerInfo;
};

function Stat({ stat: { mp, si, so, g, yc, rc } }: { stat: PlayerStat }) {
  return (
    <p className="mb-4">
      {mp} match{mp === 1 ? "" : "es"} (↓{so} ↑{si}), {g} goal
      {g === 1 ? "" : "s"}
      {(yc > 0 || rc > 0) && ", "}
      {yc > 0 && ` ${yc}Y`}
      {rc > 0 && ` ${rc}R`}
    </p>
  );
}

export default function PlayerPage({
  name,
  stat,
  competitions,
  matches,
  info,
}: Props) {
  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`${BASE_URL}/players/${playerCatalog(name)}/${playerSlug(
            name
          )}`}
        />
      </Head>
      <Layout title={[name, "Players"]}>
        <h2 className="mb-4 font-semibold uppercase">{name}</h2>
        <Stat stat={stat} />
        <Competitions names={competitions} />
        <Fixtures title="Matches" matches={matches} />
        <Info info={info} />
      </Layout>
    </>
  );
}
