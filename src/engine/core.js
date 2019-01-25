export default class Core {
  constructor({ host, port, username, password, database }) {
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
    this.database = database;
  }

  dump() {
    console.log(
      `Host: ${this.host} :: Port: ${this.port} :: Username: ${
        this.username
      } :: Password: ${this.password} :: Database: ${this.database}`
    );
  }
}
