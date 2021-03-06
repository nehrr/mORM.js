import Core from "./core";
import mysql from "mysql";

export default class MySQL extends Core {
  constructor(options) {
    super(options);
  }

  async initialize() {
    const { host, port, username, password, database } = this;

    this.client = new mysql.createConnection({
      user: username,
      host,
      database,
      password,
      port
    });

    try {
      this.client.connect(err => {
        throw new Error(`Database ${database} does not exist`);
      });
      console.log("connected");
    } catch (e) {
      throw new Error(`Database ${database} does not exist`);
    }
  }
}
