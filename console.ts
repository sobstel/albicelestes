import repl from "repl";
import * as H from "./helpers";
import * as U from "./utility";

const server = repl.start("> ");

server.context.H = H;
server.context.helpers = H;

server.context.U = U;
server.context.utility = U;
