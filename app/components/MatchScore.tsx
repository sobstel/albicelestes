import React from "react";

import { MatchItem, Result } from "~/types";

export default function MatchScore({ match }: { match: MatchItem }) {
  if (match.result === Result.Suspended) {
    return <>*</>;
  }

  const score = match.score.join(":");

  if (match.pen) {
    return (
      <>
        <span className="text-xxs md:text-xs">({match.pen[0]})</span>
        {score}
        <span className="text-xxs md:text-xs">({match.pen[1]})</span>
      </>
    );
  }

  return <>{score}</>;
}
