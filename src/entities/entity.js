import mLog from "../libs/mLog";
import { isEmpty } from "lodash";

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
        let query, res;
        if (isEmpty(attributes)) {
          query = `SELECT * FROM ${table} WHERE id = ${id}`;
        } else {
          query = `SELECT ${attributes.join(
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
        let query, res;
        if (isEmpty(attributes)) {
          query = `SELECT * FROM ${table}`;
        } else {
          query = `SELECT ${attributes.join(",")} FROM ${table} WHERE `;
        }

        try {
          res = await this.dbInstance.client.query(query);
          return res.rows;
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
        console.log(attributes);
        let query, res;
        if (isEmpty(attributes)) {
          query = `SELECT * FROM ${table}`;
        } else if (isEmpty(where)) {
          query = `SELECT ${attributes.join(",")} FROM ${table} `;
        } else {
          query = `SELECT ${attributes.join(",")} FROM ${table} WHERE `;
          for (const key in where) {
            if (where.hasOwnProperty(key)) {
              const value = where[key];
              query += ` ${key} = '${value}'`;
            }
          }

          query += " LIMIT 1";
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
        let query, res;
        query = `UPDATE ${table}(firstname, lastname) VALUES ($1, $2)`;

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

  async remove(data) {}
}
