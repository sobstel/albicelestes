import internalAPI from "lib/api/internal";
import Layout from "components/Layout";
import Link from "components/layout/Link";
import Header from "components/layout/Header";

type Props = { teams: any[] };

const TeamsPage = ({ teams }: Props) => {
  return (
    <Layout title="Rival Teams">
      <Header text="Teams" />
      {teams.map(({ name, slug, mp }) => (
        <p key={slug}>
          <Link href="/teams/[slug]" as={`/teams/${slug}`} important={mp >= 10}>
            {name}
          </Link>{" "}
          ({mp})
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
