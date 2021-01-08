import repl from "repl";
import * as DB from "db";
import * as F from "functions";
import * as H from "helpers";
import * as U from "utility";

export default async (): Promise<void> => {
  const server = repl.start("> ");

  server.context.DB = DB;
  server.context.db = DB;
  server.context.F = F;
  server.context.functions = F;
  server.context.H = H;
  server.context.helpers = H;
  server.context.U = U;
  server.context.utility = U;

  // TODO: import remeda
};
