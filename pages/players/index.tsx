import Layout from "components/Layout";
import Nav from "components/players/Nav";

type Props = {};

const PlayersPage = ({}: Props) => {
  return (
    <Layout title={`Players`}>
      <Nav />
    </Layout>
  );
};

PlayersPage.getInitialProps = async ({}: any) => {
  return {};
};

export default PlayersPage;
