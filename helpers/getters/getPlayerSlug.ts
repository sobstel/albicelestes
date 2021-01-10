import * as R from "remeda";
import slugify from "slugify";
import getPlayerName from "./getPlayerName";

export default function getPlayerSlug(name: string): string {
  const playerName = getPlayerName(name);
  const names = [
    playerName.firstName,
    playerName.middleName,
    playerName.lastName,
  ];

  return slugify(R.compact(names).join(" ").trim(), {
    lower: true,
    remove: /[']/g,
  });
}
