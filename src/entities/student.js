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
<<<<<<< HEAD
        lastname: {
=======
        lasname: {
>>>>>>> 20873522e63a285a66ae58772d13c92ae93fccc7
          type: "string"
        }
      }
    };
  }
}
