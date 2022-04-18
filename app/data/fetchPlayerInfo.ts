import { getPlayerInitial, getPlayerSlug } from "~/helpers";
import { PlayerInfo } from "~/types";

export default function fetchPlayerInfo(name: string, id: string): PlayerInfo {
  try {
    return require(`data/players/${getPlayerInitial(name)}/${getPlayerSlug(
      name
    )}-${id}.json`);
  } catch (e) {
    return {};
  }
}
