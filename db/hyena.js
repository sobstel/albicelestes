import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

export const connect = () => {
  const adapter = new FileSync(`${__dirname}/hyena.json`);
  const db = low(adapter);
  return db;
};
