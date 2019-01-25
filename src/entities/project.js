import Entity from "./entity";

export default class Project extends Entity {
  constructor() {
    super();
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
