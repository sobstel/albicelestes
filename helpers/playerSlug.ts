import slugify from "slugify";
import playerName from "./playerName";

export default function playerSlug(name: string) {
  const _playerName = playerName(name);
  return slugify(
    [_playerName.firstName, _playerName.middleName, _playerName.lastName]
      .join(" ")
      .trim(),
    {
      lower: true,
      remove: /[']/g,
    }
  );
}
