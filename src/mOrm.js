import { isEmpty } from "lodash";
import fs from "fs";
import PostGreSQL from "./engine/postgresql";

export default class mOrm {
  configPathName = "./mrom.config.js";

  async createConnection(dbConfig = {}) {
    switch (typeof dbConfig) {
      case "string":
        //regex to get params
        //postgres://user:pass@host:port/dbname
        break;
      case "object":
        if (isEmpty(dbConfig)) {
          if (!fs.existsSync(this.configPathName)) {
            throw new Error("Config required");
          }
          this.config = require(this.configPathName);
        } else {
          this.config = dbConfig;
        }

        break;
    }

    const { host, port, username, pass, type, database } = this.config;

    switch (type) {
      case "postgres":
        this.dbInstance = new PostGreSQL({
          host,
          port,
          username,
          pass,
          database
        });
        break;

      case "mysql":
        this.dbInstance = new MySQL({ host, port, username, pass, database });
        break;

      case "sqlite":
        this.dbInstance = new SQLite({ host, port, username, pass, database });
        break;

      default:
    }

    await this.dbInstance.initialize();
  }
}
