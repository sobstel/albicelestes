import Layout from "components/Layout";
import Nav from "components/players/Nav";

type Props = {};

const PlayersPage = ({}: Props) => {
  return (
    <Layout title={`Argentina Players`}>
      <Nav />
    </Layout>
  );
};

PlayersPage.getInitialProps = async ({}: any) => {
  // const { id, slug } = query;
  // const result = await internalAPI(`players/${id}`);
  return {};
};

export default PlayersPage;
