import Entity from "./entity";

export default class Note extends Entity {
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
        }
      }
    };
  }
}
