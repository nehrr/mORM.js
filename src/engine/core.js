import mDump from "../libs/mDump";

export default class Core {
  constructor({
    host,
    port,
    username,
    password,
    database,
    synchronize = false,
    entities = []
  }) {
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
    this.database = database;
    this.synchronize = synchronize;
    this.entities = entities;
  }

  dump() {
    mDump(
      `Host: ${this.host} :: Port: ${this.port} :: Username: ${ this.username} :: Password: ${this.password} :: Database: ${this.database}`
    );
  }
}
