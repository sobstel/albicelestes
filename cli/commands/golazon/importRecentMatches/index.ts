import { program } from "commander";
import action from "./action";

program
  .command("golazon:import-recent-matches")
  .description("Import recent matches from Golazon")
  .action(action);
