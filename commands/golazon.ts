import { program } from "commander";
import importRecentMatchesAction from "./golazon/import-recent-matches";

program.command("import-recent-matches").action(importRecentMatchesAction);

program.parse(process.argv);
