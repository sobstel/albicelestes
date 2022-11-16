import React from "react";
import slugify from "slugify";

import { Block } from "~/components/layout";
import { LinkAnchor } from "~/components/layout";
import { CoachItem } from "~/types";

export type Props = {
  coaches?: Array<CoachItem>;
};

export default function CoachesList({ coaches }: Props) {
  if (!coaches || coaches.length === 0) return null;

  return (
    <Block>
      {coaches.map(({ name, yearFrom, yearTo, mp }) => {
        const slug = slugify(name, { lower: true });
        return (
          <p key={name}>
            <LinkAnchor href={`/coaches/${slug}`}>{name}</LinkAnchor> {yearFrom}
            -{yearTo} ({mp})
          </p>
        );
      })}
    </Block>
  );
}
