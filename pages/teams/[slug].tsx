import internalAPI from "lib/api/internal";
import Fixtures from "components/Fixtures";
import Competitions from "components/Competitions";
import Layout from "components/Layout";
import Header from "components/layout/Header";

type Props = {
  name: string;
  matches: any[];
  competitions: string[];
  stat: any;
};

const TeamStat = ({ stat: { mp, mw, md, ml, gf, ga } }: any) => {
  return (
    <p className="mb-4">
      {mp} matches ({mw}W {md}D {ml}L), goals: {gf}-{ga}
    </p>
  );
};

const TeamPage = ({ name, matches, competitions, stat }: Props) => {
  const title = `Argentina v ${name}`;
  return (
    <Layout title={`${title} | Rival Teams`}>
      <Header text={title} />
      <TeamStat stat={stat} />
      <Competitions names={competitions} />
      <Header text="Matches" />
      <Fixtures matches={matches} />
    </Layout>
  );
};

TeamPage.getInitialProps = async ({ query, res }: any) => {
  const { slug } = query;
  const result = await internalAPI(`teams/${slug}`);

  if (res) {
    res.setHeader(
      "Link",
      `<https://albicelestes.com/teams/${slug}>; rel="canonical"`
    );

    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, max-age=60, stale-while-revalidate"
    );
  }

  return { ...result };
};

export default TeamPage;
