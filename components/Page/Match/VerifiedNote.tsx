import React from "react";
import { Match } from "types";

// TODO: linkify sources eg. Animals -> https://www.amazon.com/Animals-Story-England-v-Argentina/dp/1848184085

type Props = { match: Pick<Match, "verified"> };

export default function VerifiedNote({ match: { verified } }: Props) {
  if (!verified) {
    return (
      <p className="pt-2 text-xs">
        Data might not be accurate for this game yet. It needs to be verified.
        <br />
        Want to help? Drop me a line at przemek&#64;sobstel&#46;org.
      </p>
    );
  }

  return (
    <p className="pt-2 text-xs">Data verified with: {verified.join(", ")}.</p>
  );
}
