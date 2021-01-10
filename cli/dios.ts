import { program } from "commander";
import { spinner, message } from "cli/utlity";

import console from "./commands/console";
import importRecentMatches from "./commands/golazon/importRecentMatches/importRecentMatches";

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

program.command("console").action(console);
program.command("golazon:import-recent-matches").action(importRecentMatches);

program.parse(process.argv);
