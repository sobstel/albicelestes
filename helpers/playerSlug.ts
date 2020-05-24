import * as R from "remeda";
import slugify from "slugify";
import playerName from "./playerName";

export default function playerSlug(name: string) {
  const _playerName = playerName(name);
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
