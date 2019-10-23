import low from "lowdb";
import MemoryAdapter from "lowdb/adapters/Memory";

import hyenaDB from "../db/hyena";

const db = low(new MemoryAdapter("", { defaultValue: hyenaDB }));

export default db;
