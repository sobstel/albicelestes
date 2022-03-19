import * as R from "remeda";

type Inflections = Record<string, string>;

export default R.once(
  (): Inflections => require("./inflections/competitions.json")
);
