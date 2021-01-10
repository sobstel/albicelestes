import slugify from "slugify";
import getPlayerName from "./getPlayerName";

export default function getPlayerCatalog(name: string) {
  const _playerName = getPlayerName(name);
  return slugify(_playerName.lastName, { lower: true }).charAt(0);
}
