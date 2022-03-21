import { program } from "commander";

import action from "./action";

program
  .command("data:validate-format")
  .description("Validate format of matches json")
  .action(action);
