import * as R from "remeda";
import memoize from "lodash.memoize";
import slugify from "slugify";

export const playerName = memoize(function (
  name: PlayerName | string
): PlayerName {
  if (typeof name !== "string") return name;

  const nameParts = name.split(" ");

  let lastName = nameParts.pop() || "";
  const firstName = nameParts.shift() || "";

  const lastNamePart = R.last(nameParts) || "";
  if (lastNamePart.length >= 2 && lastNamePart.length <= 3) {
    lastName = [lastNamePart, lastName].join(" ");
    nameParts.pop();
  }

  const middleName = nameParts.join(" ") || "";

  return { firstName, middleName, lastName };
});

export function playerCatalog(name: string) {
  const _playerName = playerName(name);
  return slugify(_playerName.lastName, { lower: true })[0];
}

export function playerSlug(name: string) {
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
