import Core from "./core";
import { Client } from "pg";

export default class PostgreSQL extends Core {
  constructor(options) {
    super(options);
  }

  async initialize() {
    const { host, port, username, password, database } = this;

    this.client = new Client({
      user: username,
      host,
      database,
      password,
      port
    });

    try {
      await this.client.connect();
      console.log("connected");
    } catch (e) {
      throw new Error(`Database ${database} does not exist`);
    }
  }
}
