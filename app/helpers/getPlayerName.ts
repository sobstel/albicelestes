import memoize from "lodash.memoize";
import * as R from "remeda";

import { PlayerName } from "~/types";

export const getPlayerName = memoize((name: string): PlayerName => {
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

export default getPlayerName;
