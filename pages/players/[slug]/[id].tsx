import internalAPI from "lib/api/internal";
import Layout from "components/Layout";
import Fixtures from "components/Fixtures";

interface Props {
  id: string;
  slug: string;
  name: string;
  stat: any;
  competitions: string[];
  matches: any[];
}

const PlayerStat = ({ stat: { mp, mw, md, ml, goals } }: any) => {
  return (
    <p className="mb-4">
      {mp} matches ({mw}W {md}D {ml}L), {goals} goals scored
    </p>
  );
};

const PlayerPage = ({ name, stat, competitions, matches }: Props) => {
  return (
    <Layout title={`${name} | Argentina Players`}>
      <h2 className="mb-4 font-semibold uppercase">{name}</h2>
      <PlayerStat stat={stat} />
      {competitions.length > 0 && (
        <>
          <h2 className="mb-4 font-semibold uppercase">Competitions</h2>
          <p className="mb-4">{competitions.join(", ")}</p>
        </>
      )}
      <h2 className="mb-4 font-semibold uppercase">Matches</h2>
      <Fixtures matches={matches} />
    </Layout>
  );
};

PlayerPage.getInitialProps = async ({ query }: any) => {
  const { id, slug } = query;
  const result = await internalAPI(`players/${id}`);
  return { id, slug, ...result };
};

export default PlayerPage;
