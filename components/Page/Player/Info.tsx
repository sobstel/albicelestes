import React from "react";
import { PlayerInfo } from "types";
import { Block, Header } from "components/layout";
import InfoLinks from "components/shared/InfoLinks";

export default function Info({ info }: { info: PlayerInfo }) {
  return (
    <>
      {info.nicknames && (
        <Block>
          <Header text="Nickname(s)" />
          {info.nicknames.join(", ")}
        </Block>
      )}
      <InfoLinks links={info.links} />
    </>
  );
}
