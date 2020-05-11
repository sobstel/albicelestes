import React from "react";
import { PlayerInfo } from "types";
import Section from "components/Layout/Section";
import InfoLinks from "components/shared/InfoLinks";

export default function Info({ info }: { info: PlayerInfo }) {
  return (
    <>
      {info.nicknames && (
        <Section title="Nickname(s)">{info.nicknames.join(", ")}</Section>
      )}
      <InfoLinks links={info.links} />
    </>
  );
}
