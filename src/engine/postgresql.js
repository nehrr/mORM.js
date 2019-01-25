import Core from "./core";
import { Client } from "pg";
import { isEmpty } from "lodash";

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
          this.client.query(
            `DROP TABLE IF EXISTS ${entities[i]} CASCADE `,
            (err, res) => {
              if (err) {
                throw new Error(err.stack);
              } else {
                console.log(`Table ${entities[i]} has been deleted`);
              }
            }
          );
        }
      }

      console.log("connected");
    } catch (e) {
      throw new Error(`Database ${database} does not exist`);
    }
  }
}
