import Entity from "./entity";

export default class Note extends Entity {
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
