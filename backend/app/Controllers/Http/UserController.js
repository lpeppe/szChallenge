"use strict";
const Database = use("Database");
const User = use("App/Models/User");

class UserController {
  getUsers({ request }) {
    let { pageIndex, pageSize, filter } = request.all();
    pageIndex > 0 ? pageIndex++ : null;
    if (filter) {
      filter = filter.trim().toLowerCase();
      return Database.from("users")
        .select(
          "id",
          "first_name as firstName",
          "surname",
          "date_of_birth as dateOfBirth",
          "email"
        )
        .whereRaw(
          `first_name LIKE '%${filter}%' 
              OR surname LIKE '%${filter}%' 
              OR email LIKE '%${filter}%'`
        )
        .paginate(pageIndex, pageSize);
    }
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

  addUser({ request }) {
    const {
      firstName: first_name,
      surname,
      dateOfBirth: date_of_birth,
      email
    } = request.all();
    return User.create({
      first_name,
      surname,
      date_of_birth,
      email
    });
  }
}

module.exports = UserController;
