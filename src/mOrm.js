import { isEmpty } from "lodash";
import fs from "fs";

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

    const { host, post, username, pass, type } = this.config;

    switch (type) {
      case "postgres":
        this.dbInstance = new PostGreSQL({ host, post, username, pass });
        break;

      case "mysql":
        this.dbInstance = new MySQL({ host, post, username, pass });
        break;

      case "sqlite":
        this.dbInstance = new SQLite({ host, post, username, pass });
        break;

      default:
    }

    await this.dbInstance.initialize();
  }
}
