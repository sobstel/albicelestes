import moment from "moment";
import hyena from "../lib/hyena";
import Layout from "../components/Layout";
import ExpatsMatch from "../components/expats/Match";

interface Props {
  date: string,
  expatsMatches: any[];
}

const ExpatsPage = ({ date, expatsMatches }: Props) => (
  <div>
    <Layout>
      <h2 className="mb-4 font-semibold uppercase">{date}</h2>
      {expatsMatches.map(match => (<ExpatsMatch key={match.match_id} match={match} />))}
    </Layout>
  </div>
);

ExpatsPage.getInitialProps = async ({ res }: any) => {
  const today = moment().format('YYYY-MM-DD');
  const expatsMatches = await hyena(`expats/${today}`);

  if (res) {
    res.setHeader('Cache-Control', 's-maxage=300, max-age=0');
  }

  return { date: today, expatsMatches };
};

export default ExpatsPage;
