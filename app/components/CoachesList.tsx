import React from "react";

import { Block } from "~/components/layout";
import { CoachItem } from "~/types";

export type Props = {
  coaches?: Array<CoachItem>;
};

export default function CoachesList({ coaches }: Props) {
  if (!coaches || coaches.length === 0) return null;

  return (
    <Block>
      {coaches.map(({ name }) => {
        return <p key={name}>{name}</p>;
      })}
    </Block>
  );
}
