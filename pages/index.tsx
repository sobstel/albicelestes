import React from "react";
import Layout from "../components/Layout";
import Fixtures from "../components/Fixtures";
import hyena from "../lib/hyena";

interface Props {
  upcomingMatches: any[];
  recentMatches: any[];
}

const IndexPage = ({ upcomingMatches, recentMatches }: Props) => (
  <div>
    <Layout>
      <Fixtures title="Upcoming fixtures" matches={upcomingMatches} />
      <Fixtures title="Recent fixtures" matches={recentMatches} />
    </Layout>
  </div>
);

IndexPage.getInitialProps = async () => {
  const upcomingMatches = await hyena("matches/upcoming");
  const recentMatches = (await hyena("matches/recent")).reverse();
  return { upcomingMatches, recentMatches };
};

export default IndexPage;
