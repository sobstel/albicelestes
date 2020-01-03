import { flatten, filter, reduce } from "lodash";
import internalAPI from "lib/api/internal";
import Layout from "components/Layout";
import Fixtures from "components/Fixtures";

interface Props {
  id: string;
  slug: string;
  name: string;
  competitions: string[];
  matches: any[];
}

const PlayerStat = ({ id, matches }: { id: string; matches: any[] }) => {
  const mp = matches.length;
  const [mw, md, ml] = ["W", "D", "L"].map(result => {
    return matches.filter(match => match.result === result).length;
  });
  const goals = reduce(
    matches,
    (count, match) => {
      return (
        count +
        filter(
          flatten(match.goals),
          (goal: any) => goal.id === id && goal.type !== "OG"
        ).length
      );
    },
    0
  );

  return (
    <p className="mb-4">
      {mp} matches ({mw}W {md}D {ml}L), {goals} goals scored
    </p>
  );
};

const PlayerPage = ({ id, name, competitions, matches }: Props) => {
  return (
    <Layout title={`${name} | Argentina Players`}>
      <h2 className="mb-4 font-semibold uppercase">{name}</h2>
      <PlayerStat id={id} matches={matches} />
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
  const { name, competitions, matches } = result;
  return { id, slug, name, competitions, matches };
};

export default PlayerPage;
