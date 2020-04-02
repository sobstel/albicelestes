import Layout from "../../Layout";
import Link from "../../Layout/Link";
import Header from "../../Layout/Header";

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
