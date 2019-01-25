import Entity from "./entity";

export default class Project extends Entity {
  constructor(options) {
    super(options);
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
