import { program } from "commander";
import * as R from "remeda";
import repl from "repl";

import * as data from "~/data";
import * as F from "~/helpers";
import * as H from "~/helpers";
import * as U from "~/utility";

program.command("console").description("Interactive console").action(action);

function action() {
  const server = repl.start("> ");

  server.context.D = data;
  server.context.data = data;
  server.context.F = F;
  server.context.functions = F;
  server.context.H = H;
  server.context.helpers = H;
  server.context.U = U;
  server.context.utility = U;

  server.context.R = R;
}
