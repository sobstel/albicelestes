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
  const today = moment();
  const date = query.date ? moment(query.date) : today;

  const formattedDate = date.format("YYYY-MM-DD");
  const expatsMatches = await hyena(`argentina/expats/${formattedDate}`);

  if (res) {
    const daysAgo = today.diff(date, "days");
    const maxAge = daysAgo <= 0 ? 3600 : daysAgo * 24 * 60 * 60;

    res.setHeader(
      "Cache-Control",
      `s-maxage=${maxAge}, max-age=60, stale-while-revalidate`
    );
  }

  return { date, expatsMatches };
};

export default ExpatsPage;
