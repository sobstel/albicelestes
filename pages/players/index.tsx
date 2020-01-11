import Layout from "components/Layout";
import Nav from "components/players/Nav";

type Props = {};

const PlayersPage = ({}: Props) => {
  return (
    <Layout title={`Argentina Players`}>
      <Nav />
      <h2 className="mb-4 font-semibold uppercase">Players</h2>
      <p>TODO</p>
    </Layout>
  );
};

PlayersPage.getInitialProps = async ({}: any) => {
  // const { id, slug } = query;
  // const result = await internalAPI(`players/${id}`);
  return {};
};

export default PlayersPage;
