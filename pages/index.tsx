import Layout from "../components/Layout";
import Fixtures from "../components/Fixtures";
import hyena from "../lib/hyena";

interface Props {
  upcomingMatches: any[];
  recentMatches: any[];
}

const IndexPage = ({ upcomingMatches, recentMatches }: Props) => (
  <Layout title="¡Vamos Argentina! 🇦🇷">
    <Fixtures title="Upcoming fixtures" matches={upcomingMatches} />
    <Fixtures title="Recent fixtures" matches={recentMatches} />
  </Layout>
);

IndexPage.getInitialProps = async ({ res }: any) => {
  const [upcomingMatches, recentMatches] = await Promise.all([
    hyena("argentina/matches/upcoming"),
    hyena("argentina/matches/recent")
  ]);

  if (res) {
    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, max-age=60, stale-while-revalidate"
    );
  }

  return { upcomingMatches, recentMatches: recentMatches.reverse() };
};

export default IndexPage;
