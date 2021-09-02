import { program } from "commander";
import action from "./action";

program
  .command("golazon:import-matches")
  .argument("<year>", "Year")
  .description("Import matches from Golazon")
  .action(action);
