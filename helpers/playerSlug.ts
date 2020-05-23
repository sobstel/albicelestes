import * as R from "remeda";
import slugify from "slugify";
import playerName from "./playerName";

type Opts = {
  firstInitialOnly?: boolean;
};

export default function playerSlug(name: string, opts: Opts = {}) {
  const _playerName = playerName(name);

  const names = [
    _playerName.firstName,
    _playerName.middleName,
    _playerName.lastName,
  ];

  if (opts.firstInitialOnly) {
    names[0] = names[0].charAt(0);
  }

  return slugify(R.compact(names).join(" ").trim(), {
    lower: true,
    remove: /[']/g,
  });
}
