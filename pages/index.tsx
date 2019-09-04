import React from "react";
import Fixtures from "../components/Fixtures";
import hyena from "../lib/hyena";

interface Props {
  upcomingMatches: any[];
  recentMatches: any[];
}

const IndexPage = ({ upcomingMatches, recentMatches }: Props) => (
  <div>
    <Fixtures title="Upcoming fixtures" matches={upcomingMatches} />
    <Fixtures title="Recent fixtures" matches={recentMatches} />
  </div>
);

IndexPage.getInitialProps = async ({ res }: any) => {
  const upcomingMatches = await hyena("matches/upcoming");
  const recentMatches = (await hyena("matches/recent")).reverse();

  if (res) {
    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, max-age=60, stale-while-revalidate"
    );
  }

  return { upcomingMatches, recentMatches };
};

export default IndexPage;
