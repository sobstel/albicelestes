import { last, memoize } from "lodash";
import slugify from "slugify";

// TODO: use memoize
export const playerName = memoize(function(
  name: PlayerName | string
): PlayerName {
  if (typeof name !== "string") return name;

  let nameParts = name.split(" ");

  let lastName = nameParts.pop() || "";
  const firstName = nameParts.shift() || "";

  const lastNamePart = last(nameParts) || "";
  if (lastNamePart.length >= 2 && lastNamePart.length <= 3) {
    lastName = [lastNamePart, lastName].join(" ");
    nameParts.pop();
  }

  let middleName = nameParts.join(" ") || "";

  return { firstName, middleName, lastName };
});

export function playerCatalog(name: PlayerName | string) {
  const normalizedPlayerName = playerName(name);
  return slugify(normalizedPlayerName.lastName, { lower: true })[0];
}

export function playerSlug(name: PlayerName | string) {
  const normalizedPlayerName = playerName(name);
  return slugify(
    [
      normalizedPlayerName.firstName,
      normalizedPlayerName.middleName,
      normalizedPlayerName.lastName
    ]
      .join(" ")
      .trim(),
    {
      lower: true,
      remove: /[']/g
    }
  );
}
