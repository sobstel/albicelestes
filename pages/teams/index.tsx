import internalAPI from "lib/api/internal";
import Layout from "components/Layout";

type Props = { teams: any[] };

const TeamsPage = ({ teams }: Props) => {
  return (
    <Layout title={`Teams`}>
      {teams.map(team => (
        <p key={team.slug}>
          {team.name} ({team.mp})
        </p>
      ))}
    </Layout>
  );
};

TeamsPage.getInitialProps = async ({}: any) => {
  const result = await internalAPI(`teams`);
  const { teams } = result;
  return { teams };
};

export default TeamsPage;
