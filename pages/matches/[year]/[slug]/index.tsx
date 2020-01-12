import Layout from "components/Layout";
import internalAPI from "lib/api/internal";

const OldMatchesPage = () => {
  return (
    <Layout title={"Error 404"}>
      <p>&nbsp;</p>
    </Layout>
  );
};

OldMatchesPage.getInitialProps = async ({ query, res }: any) => {
  const { year: slug, slug: id } = query;
  const result = await internalAPI(`matches/${id}`);
  const { match } = result;

  if (!match) {
    res.statusCode = 308;
    res.setHeader("Location", "/matches/2019");

    return {};
  }

  const year = match.date.slice(0, 4);
  if (res) {
    res.statusCode = 308;
    res.setHeader("Location", `/matches/${year}/${slug}/${id}`);
  }

  return {};
};

export default OldMatchesPage;
