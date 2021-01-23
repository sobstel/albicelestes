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

  const { name } = match.venue;

  return (
    <Block>
      <Header text="Venue" />
      {name}
    </Block>
  );
}
