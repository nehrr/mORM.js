import Core from "./core";
const sqlite3 = require("sqlite3").verbose();

export default class SQLite extends Core {
  constructor(options) {
    super(options);
  }

  async initialize() {
    const db = new sqlite3.Database(":memory.db:", err => {
      if (err) {
        throw new Error(err.message);
      }
      console.log("Connected to the in-memory SQlite database.");
    });
  }
}
