import * as R from "remeda";
import React from "react";
import { Block, Header } from "components/layout";
import { Match } from "types";

type Props = {
  match: Pick<Match, "venue">;
};

export default function Venue({ match }: Props) {
  if (!match.venue) {
    return null;
  }

  const { name, city } = match.venue;

  return (
    <Block>
      <Header text="Venue" />
      {R.compact([name, city]).join(", ")}
    </Block>
  );
}
