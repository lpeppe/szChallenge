"use strict";
const Database = use("Database");

class UserController {
  getUsers({ request }) {
    let { pageIndex, pageSize } = request.all();
    pageIndex > 0 ? pageIndex++ : null;
    return Database.from("users")
      .select(
        "id",
        "first_name as firstName",
        "surname",
        "date_of_birth as dateOfBirth",
        "email"
      )
      .paginate(pageIndex, pageSize);
  }
}

module.exports = UserController;
