import { program } from "commander";
import { spinner, message } from "utility/command";

import importRecentMatchesAction from "./golazon/import-recent-matches";

process.on("uncaughtException", (error) => {
  message.error(error.message);
  spinner.error(`${error.name}: ${error.message}`);
});
process.on("unhandledRejection", (reason) => {
  if (reason instanceof Error) {
    spinner.error(`${reason.name}: ${reason.message}`);
    message.error(reason.stack ?? "");
  } else {
    spinner.error("Unhandled rejection");
    message.error(reason?.toString() ?? "");
  }
});

program.command("import-recent-matches").action(importRecentMatchesAction);

program.parse(process.argv);
