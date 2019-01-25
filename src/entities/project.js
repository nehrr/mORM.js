import Entity from "./entity";

export default class Project extends Entity {
  constructor(dbInstance, name) {
    super(dbInstance, name);
  }

  static meta() {
    return {
      name: "Project",
      columns: {
        id: {
          primary: true,
          type: "int",
          generated: true
        },
        name: {
          type: "string"
        }
      }
    };
  }
}
