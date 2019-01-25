import Entity from "./entity";

export default class Note extends Entity {
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
        id_student: {
          primary: true,
          type: "int",
          generated: true
        },
        id_project: {
          primary: true,
          type: "int",
          generated: true
        }
      }
    };
  }
}
