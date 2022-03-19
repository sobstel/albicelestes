import * as R from "remeda";
import { Bibliography } from "~/types";

export default R.once((): Bibliography => require("./bibliography.json"));
