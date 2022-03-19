import React from "react";
import { Match } from "~/types";
import { Block, Header } from "~/components/layout";

type Props = { match: Pick<Match, "sources"> };

export default function VerifiedNote({ match: { sources } }: Props) {
  if (!sources || sources.length === 0) {
    return (
      <p className="text-xs italic">
        Data might not be fully accurate for this game yet. It needs to be
        verified with reliable sources. Want to help? Contace me at
        przemek&#64;sobstel&#46;org.
      </p>
    );
  }

  return (
    <Block>
      <Header text="Sources" />
      {sources.join(", ")}
    </Block>
  );
}
