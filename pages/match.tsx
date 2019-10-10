import hyena from "../lib/hyena";

interface Props {
  match: any;
}

const MatchPage = ({ match }: Props) => (
  <p>
    {match.match_id} -> {match.date} {match.home_name} {match.away_name}
  </p>
);

MatchPage.getInitialProps = async ({ query }: any) => {
  const { id } = query;
  const match = await hyena(`matches/${id}`);
  return { match };
};

export default MatchPage;
