import low from "lowdb";
import MemoryAdapter from "lowdb/adapters/Memory";

import hyenaJS from "../db/hyena";

export const hyenaDB = low(new MemoryAdapter("", { defaultValue: hyenaJS }));
