import "./commands";

import { program } from "commander";

import { message, spinner } from "./utlity";

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
    message.error((reason as Error)?.toString() ?? "");
  }
});

program.parse(process.argv);
