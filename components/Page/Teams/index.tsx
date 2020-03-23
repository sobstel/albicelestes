import Layout from "components/Layout";
import Link from "components/Layout/Link";
import Header from "components/Layout/Header";

export type Props = {
  teams: TeamItem[];
};

export default function TeamsPage({ teams }: Props) {
  return (
    <Layout title={["Rival Teams"]}>
      <Header text="Teams" />
      {teams.map(({ name, slug, mp }) => (
        <p key={slug}>
          <Link
            href="/teams/[slug]"
            as={`/teams/${slug}`}
            important={!!mp && mp >= 10}
          >
            {name}
          </Link>{" "}
          ({mp})
        </p>
      ))}
    </Layout>
  );
}
