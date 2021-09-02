import { program } from "commander";
import action from "./action";

program
  .command("golazon:import-matches")
  .description("Import matches from Golazon")
  .action(action);
