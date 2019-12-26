"use strict";
const User = use("App/Models/User");
const Database = use("Database");

class UserController {
  getUsers({ request }) {
    const { pageIndex, pageSize } = request.all();
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
