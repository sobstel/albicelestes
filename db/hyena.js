import low from "lowdb";
// import FileSync from "lowdb/adapters/FileSync";
import Base from "lowdb/adapters/Base";
import testDb from "./hyena-db";

class LowAdapter extends Base {
  read() {
    return testDb;
  }
  write(data) {}
}

// const adapter = new FileSync("./hyena.json");
const db = low(new LowAdapter(""));

export const connect = () => {
  return db;
};
