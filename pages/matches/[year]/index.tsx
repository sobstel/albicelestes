import { map, toNumber } from "lodash";
import { NextPageContext } from "next";
import internalAPI from "lib/api/internal";
import { MIN_YEAR, MAX_YEAR } from "lib/config";
import ErrorPage from "pages/_error";
import Nav from "components/matches/Nav";
import Fixtures from "components/Fixtures";
import Layout from "components/Layout";
import PlayerName from "components/PlayerName";

interface Props {
  matches: PartialMatch[];
  // playersStat: { name: string }[];
  playersStat: any[];
  year: string;
}

const MatchesPage = ({ year, matches, playersStat }: Props) => {
  if (!matches || !year) {
    return <ErrorPage statusCode={404} />;
  }

  const names = map(playersStat, "name");

  return (
    <Layout title={`Argentina matches & players | ${year}`}>
      <Nav year={toNumber(year)} />
      {matches.length === 0 && <p>No matches for {year}</p>}
      {matches.length > 0 && (
        <>
          <h2 className="mb-4 font-semibold uppercase">
            Matches ({matches.length})
          </h2>
          <Fixtures matches={matches} />
        </>
      )}
      {playersStat.length > 0 && (
        <>
          <h2 className="mb-4 font-semibold uppercase">
            Players ({playersStat.length})
          </h2>
          {playersStat.map(({ id, name, mp, si, so, g }) => (
            <p key={id}>
              <PlayerName name={name} names={names} id={id} /> {mp} matches (
              {si} SI, {so} SO), {g} goals
            </p>
          ))}
        </>
      )}
    </Layout>
  );
};

MatchesPage.getInitialProps = async ({ res, query }: NextPageContext) => {
  const year = query.year || MAX_YEAR;

  if (year < MIN_YEAR || year > MAX_YEAR) {
    if (res) res.statusCode = 404;
    return {};
  }

  const result = await internalAPI(`matches?year=${year}`);

  if (!result) {
    return { year, matches: [], playersStat: [] };
  }

  return { year, ...result };
};

export default MatchesPage;
