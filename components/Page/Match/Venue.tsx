import React from "react";
import Section from "components/Layout/Section";
import { Match } from "types";

type Props = {
  match: Pick<Match, "venue">;
};

export default function Venue({ match }: Props) {
  if (!match.venue) {
    return null;
  }

  const { name } = match.venue;

  return <Section title="Venue">{name}</Section>;
}
