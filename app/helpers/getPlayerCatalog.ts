import slugify from "slugify";

import getPlayerName from "./getPlayerName";

export default function getPlayerCatalog(name: string) {
  const playerName = getPlayerName(name);
  return slugify(playerName.lastName, { lower: true }).charAt(0);
}
