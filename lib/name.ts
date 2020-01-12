import { last } from "lodash";

export function playerName(name: string): PlayerName {
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
}
