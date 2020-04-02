import Layout from "../../Layout";
import Fixtures from "../../Fixtures";
import Competitions from "../../Competitions";
import Info from "./Info";

export type Props = {
  id: string;
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
      {mp} matches ({si} SI, {so} SO), {g} goals, {yc}YC {rc}RC
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
    <Layout title={[name, "Players"]}>
      <h2 className="mb-4 font-semibold uppercase">{name}</h2>
      <Stat stat={stat} />
      <Competitions names={competitions} />
      <Fixtures title="Matches" matches={matches} />
      <Info info={info} />
    </Layout>
  );
}
