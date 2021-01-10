import * as R from "remeda";
import slugify from "slugify";
import getPlayerName from "./getPlayerName";

export default function getPlayerSlug(name: string): string {
  const _playerName = getPlayerName(name);
  const names = [
    _playerName.firstName,
    _playerName.middleName,
    _playerName.lastName,
  ];

  return slugify(R.compact(names).join(" ").trim(), {
    lower: true,
    remove: /[']/g,
  });
}
