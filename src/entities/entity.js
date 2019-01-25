import mLog from "../libs/mLog";

export default class Entity {
  constructor(dbInstance, name) {
    this.dbInstance = dbInstance;
    this.name = name;
  }

  async save(data) {
    const table = this.name;
    switch (dbInstance.type) {
      case "postgres":
        dbInstance.query(
          `INSERT INTO ${table}(firstname, lastname) VALUES ($1, $2)`,
          data,
          (err, res) => {
            if (err) {
              mLog(err.stack);
            } else {
              mLog(res.rows[0]);
            }
          }
        );
        break;

      case "mysql":
        break;

      case "sqlite":
        break;
    }
  }
  async count() {
    const table = this.name;
    switch (dbInstance.type) {
      case "postgres":
        dbInstance.client.query(`COUNT(*) FROM ${table}`, (err, res) => {
          if (err) {
            throw new Error(err.stack);
          } else {
            mLog(res);
          }
        });
        break;

      case "mysql":
        break;

      case "sqlite":
        break;
    }
  }
  async findByPk(id, { attributes }) {
    const table = this.name;
    switch (dbInstance.type) {
      case "postgres":
        if (isEmpty(attributes)) {
          const query = `SELECT * FROM ${table} WHERE id = ${id}`;
        } else {
          let query = `SELECT ${attributes.join(
            ","
          )} FROM ${table} WHERE id = ${id}`;
        }
        dbInstance.client.query(query, (err, res) => {
          if (err) {
            throw new Error(err.stack);
          } else {
            mLog(res);
          }
        });
        break;

      case "mysql":
        break;

      case "sqlite":
        break;
    }
  }
  async findAll({ attributes }) {
    const table = this.name;
    switch (dbInstance.type) {
      case "postgres":
        if (isEmpty(attributes)) {
          const query = `SELECT * FROM ${table}`;
        } else {
          const query = `SELECT ${attributes.join(",")} FROM ${table} WHERE `;
        }
        dbInstance.client.query(query, (err, res) => {
          if (err) {
            throw new Error(err.stack);
          } else {
            mLog(res);
          }
        });
        break;

      case "mysql":
        break;

      case "sqlite":
        break;
    }
  }
  async findOne({ where, attributes }) {
    const table = this.name;
    switch (dbInstance.type) {
      case "postgres":
        if (isEmpty(attributes)) {
          const query = `SELECT * FROM ${table}`;
        } else if (isEmpty(where)) {
          const query = `SELECT ${attributes.join(",")} FROM ${table} `;
        } else {
          let query = `SELECT ${attributes.join(",")} FROM ${table} WHERE `;
          for (const key in where) {
            if (where.hasOwnProperty(key)) {
              const value = where[key];
              query += ` ${value}`;
            }
          }
        }
        dbInstance.client.query(query, (err, res) => {
          if (err) {
            throw new Error(err.stack);
          } else {
            mLog(res);
          }
        });
        break;

      case "mysql":
        break;

      case "sqlite":
        break;
    }
  }
  async update(data) {}
  async remove(data) {}
}
