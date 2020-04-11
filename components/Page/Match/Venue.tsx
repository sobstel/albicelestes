import React from "react";
import Section from "../../Layout/Section";

type Props = {
  match: {
    venue?: {
      name: string;
    };
  };
};

export default function Venue({ match }: Props) {
  if (!match.venue) {
    return null;
  }

  const { name } = match.venue;

  return <Section title="Venue">{name}</Section>;
}
