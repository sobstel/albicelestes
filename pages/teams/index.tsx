import * as R from "remeda";
import Page, { Props } from "components/Page/Teams";
import { collectTeams } from "functions";
import { fetchMatches } from "db";

export default function PageContainer(props: Props) {
  return <Page {...props} />;
}

export async function getStaticProps() {
  const teams = R.pipe(
    fetchMatches(),
    collectTeams,
    R.sortBy((team) => team.name)
  );

  return { props: { teams } };
}