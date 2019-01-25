import Core from "./core";
import { Client } from "pg";
import { isEmpty } from "lodash";
import mLog from "../libs/mLog";

export default class PostgreSQL extends Core {
  constructor(options) {
    super(options);
  }

  async initialize() {
    const {
      host,
      port,
      username,
      password,
      database,
      synchronize,
      entities
    } = this;

    this.client = new Client({
      user: username,
      host,
      database,
      password,
      port
    });

    try {
      await this.client.connect();

      if (synchronize && !isEmpty(entities)) {
        for (var i = 0; i < entities.length; i++) {
          let table = entities[i].prototype.constructor.name.toLowerCase();
          this.client.query(`DELETE FROM ${table}`, (err, res) => {
            if (err) {
              throw new Error(err.stack);
            } else {
              console.log(`Table ${table} has been emptied`);
            }
          });
        }
      }

      console.log(`Connected to ${this.database}`);
    } catch (e) {
      throw new Error(`Database ${database} does not exist`);
    }
  }
}
