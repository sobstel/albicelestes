import moment from "moment";
import hyenaAPI from "lib/api/hyena";
import Layout from "components/Layout";
import ExpatsMatch from "components/expats/Match";
import ExpatsNav from "components/expats/Nav";

interface Props {
  date: string;
  expatsMatches: any[];
}

const ExpatsPage = ({ date, expatsMatches }: Props) => (
  <Layout title={`Argentina football expats ${date}`}>
    <ExpatsNav date={date} />
    {expatsMatches &&
      expatsMatches.map(match => (
        <ExpatsMatch key={match.match_id} match={match} />
      ))}
  </Layout>
);

ExpatsPage.getInitialProps = async ({ res, query }: any) => {
  const todayObj = moment();
  const dateObj = moment(query.date);

  const date = dateObj.format("YYYY-MM-DD");
  const expatsMatches = await hyenaAPI(`argentina/expats/${date}`);

  if (res) {
    const daysAgo = todayObj.diff(dateObj, "days");
    const maxAge = daysAgo <= 0 ? 3600 : daysAgo * 24 * 60 * 60;

    res.setHeader(
      "Cache-Control",
      `s-maxage=${maxAge}, max-age=60, stale-while-revalidate`
    );
  }

  return { date, expatsMatches };
};

export default ExpatsPage;
