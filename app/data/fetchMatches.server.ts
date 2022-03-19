import * as R from "remeda";
import { Match } from "~/types";

// NOTE: "import" is not used to prevent tsc from checking files that are too big
const fetchMatches = R.once((): Array<Match> => require("./matches.json"));
export default fetchMatches;
