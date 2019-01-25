import Entity from "./entity";

export default class Student extends Entity {
  constructor(options) {
    super(options);
  }

  static meta() {
    return {
      name: "Student",
      columns: {
        id: {
          primary: true,
          type: "int",
          generated: true
        },
        firstname: {
          type: "string"
        },
        fullname: {
          type: "string"
        }
      }
    };
  }
}
