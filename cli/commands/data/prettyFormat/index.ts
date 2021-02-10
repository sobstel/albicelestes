import { program } from "commander";
import action from "./action";

program
  .command("data:pretty-format")
  .description("Pretty format json files")
  .action(action);
