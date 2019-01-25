import mLog from "../libs/mLog";

export default class Entity {
  constructor(dbInstance, name) {
    this.dbInstance = dbInstance;
    this.name = name;
  }

  async save(data) {
    const table = this.name;
    switch (this.dbInstance.type) {
      case "postgres":
        let res;
        let keys = [];
        let values = [];

        for (const attribute in data) {
          if (data.hasOwnProperty(attribute)) {
            keys.push(attribute);
            values.push(`'${data[attribute]}'`);
          }
        }

        const query = `INSERT INTO ${table}(${keys.join(
          ","
        )}) VALUES (${values.join(",")}) RETURNING *`;

        try {
          res = await this.dbInstance.client.query(query);
          return res.rows[0];
        } catch (e) {
          throw new Error(e);
        }

        break;

      case "mysql":
        break;

      case "sqlite":
        break;
    }
  }

  async count() {
    const table = this.name;
    switch (this.dbInstance.type) {
      case "postgres":
        let res;
        const query = `SELECT COUNT(*) FROM ${table}`;

        try {
          res = await this.dbInstance.client.query(query);
          return res.rows[0];
        } catch (e) {
          throw new Error(e);
        }

        break;

      case "mysql":
        break;

      case "sqlite":
        break;
    }
  }

  async findByPk(id, { attributes }) {
    const table = this.name;
    switch (this.dbInstance.type) {
      case "postgres":
        if (isEmpty(attributes)) {
          const query = `SELECT * FROM ${table} WHERE id = ${id}`;
        } else {
          let query = `SELECT ${attributes.join(
            ","
          )} FROM ${table} WHERE id = ${id}`;
        }

        try {
          res = await this.dbInstance.client.query(query);
          return res.rows[0];
        } catch (e) {
          throw new Error(e);
        }
        break;

      case "mysql":
        break;

      case "sqlite":
        break;
    }
  }

  async findAll({ attributes }) {
    const table = this.name;
    switch (this.dbInstance.type) {
      case "postgres":
        if (isEmpty(attributes)) {
          const query = `SELECT * FROM ${table}`;
        } else {
          const query = `SELECT ${attributes.join(",")} FROM ${table} WHERE `;
        }

        try {
          res = await this.dbInstance.client.query(query);
          return res.rows[0];
        } catch (e) {
          throw new Error(e);
        }
        break;

      case "mysql":
        break;

      case "sqlite":
        break;
    }
  }

  async findOne({ where, attributes }) {
    const table = this.name;
    switch (this.dbInstance.type) {
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

        try {
          res = await this.dbInstance.client.query(query);
          return res.rows[0];
        } catch (e) {
          throw new Error(e);
        }
        break;

      case "mysql":
        break;

      case "sqlite":
        break;
    }
  }

  async update(data) {
    const table = this.name;
    switch (this.dbInstance.type) {
      case "postgres":
        this.dbInstance.client.query(
          `UPDATE ${table}(firstname, lastname) VALUES ($1, $2)`,
          data,
          (err, res) => {
            if (err) {
              mLog(err.stack);
            } else {
              console.log(res.rows[0]);
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

  async remove(data) {}
}
