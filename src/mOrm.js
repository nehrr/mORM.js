import { isEmpty } from "lodash";
import fs from "fs";
import PostGreSQL from "./engine/postgresql";
import MySQL from "./engine/mysql";
import SQLite from "./engine/sqlite";
import Student from "./entities/student";
import Note from "./entities/note";
import Project from "./entities/project";

export default class mOrm {
  configPathName = "./mOrm.config.js";
  entities = { Student, Project, Note };

  async createConnection(dbConfig = {}) {
    if (typeof dbConfig === "object") {
      if (isEmpty(dbConfig)) {
        console.log("isEmpty");
        if (!fs.existsSync(this.configPathName)) {
          throw new Error("Config required");
        }

        this.config = require(this.configPathName);
      } else {
        this.config = dbConfig;
      }
    } else if (typeof dbConfig === "string") {
      //regex to get params
      //postgres://user:pass@host:port/dbname
    }

    const {
      host,
      port,
      username,
      pass,
      type,
      database,
      synchronize,
      entities
    } = this.config;

    switch (type) {
      case "postgres":
        this.dbInstance = new PostGreSQL({
          host,
          port,
          username,
          pass,
          database,
          synchronize,
          entities
        });

        this.dbInstance.dump();

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

  getEntity(name) {
    return new this.entities[name](this.dbInstance, name);
  }
}
