import moment from "moment";
import Head from "next/head";
import hyena from "../lib/hyena";
import ExpatsMatch from "../components/expats/Match";
import ExpatsNav from "../components/expats/Nav";

interface Props {
  date: string;
  expatsMatches: any[];
}

const ExpatsPage = ({ date, expatsMatches }: Props) => (
  <div>
    <Head>
      <title>Argentina football expats {date}</title>
    </Head>
    <ExpatsNav date={date} />
    {expatsMatches &&
      expatsMatches.map(match => (
        <ExpatsMatch key={match.match_id} match={match} />
      ))}
  </div>
);

ExpatsPage.getInitialProps = async ({ res, query }: any) => {
  const date = query.date || moment().format("YYYY-MM-DD");
  const expatsMatches = await hyena(`expats/${date}`);

  if (res) {
    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, max-age=60, stale-while-revalidate"
    );
  }

  return { date, expatsMatches };
};

export default ExpatsPage;
