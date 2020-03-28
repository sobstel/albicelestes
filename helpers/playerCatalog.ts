import slugify from "slugify";
import playerName from "./playerName";

export default function playerCatalog(name: string) {
  const _playerName = playerName(name);
  return slugify(_playerName.lastName, { lower: true }).charAt(0);
}
