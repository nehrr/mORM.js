import Core from "./core";
import sqlite3 from "sqlite3";

export default class SQLite extends Core {
  constructor(options) {
    super(options);
  }

  // async initialize() {
  //   const { host, port, username, password, database } = this;
  //
  //   try {
  //     this.client = new sqlite3.Database({
  //       user: username,
  //       host,
  //       database,
  //       password,
  //       port
  //     });
  //     console.log("connected");
  //   } catch (e) {
  //     throw new Error(`Database ${database} does not exist`);
  //   }
  // }
}
