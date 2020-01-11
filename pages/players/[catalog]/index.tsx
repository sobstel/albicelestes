import Layout from "components/Layout";

type Props = { catalog: string };

const PlayersPage = ({ catalog }: Props) => {
  return (
    <Layout title={`${catalog} | Argentina Players`}>
      <h2 className="mb-4 font-semibold uppercase">Players ({catalog})</h2>
      <p>TODO</p>
    </Layout>
  );
};

PlayersPage.getInitialProps = async ({ query }: any) => {
  const { catalog } = query;
  return { catalog };
};

export default PlayersPage;
