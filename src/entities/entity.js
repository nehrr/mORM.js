export default class Entity {
  constructor(dbInstance, name) {
    this.dbInstance = dbInstance;
    this.name = name;
  }

  async save(data) {}
  async count() {
    switch (dbInstance.type) {
      case "postgres":
        dbInstance.client.query(`COUNT(*) FROM ${name}`, (err, res) => {
          if (err) {
            throw new Error(err.stack);
          } else {
            console.log(res);
          }
        });
        break;

      case "mysql":
        break;

      case "sqlite":
        break;

      default:
    }
  }
  async findByPk(id, { attributes }) {}
  async findAll({ attributes }) {}
  async findOne({ where, attributes }) {}
  async update(data) {}
  async remove(data) {}
}
