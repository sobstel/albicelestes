import Layout from "components/Layout";
import Nav from "components/players/Nav";

type Props = { catalog: string };

const PlayersPage = ({ catalog }: Props) => {
  return (
    <Layout title={`${catalog} | Argentina Players`}>
      <Nav catalog={catalog} />
      <h2 className="mb-4 font-semibold uppercase">Players</h2>
      <p>TODO</p>
    </Layout>
  );
};

PlayersPage.getInitialProps = async ({ query }: any) => {
  const { catalog } = query;
  return { catalog };
};

export default PlayersPage;
