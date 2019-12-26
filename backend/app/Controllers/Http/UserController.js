"use strict";
const User = use("App/Models/User");

class UserController {
  getUsers() {
    return User.all().then(users =>
      users.toJSON().map(({ first_name, surname, date_of_birth, email }) => ({
        firstName: first_name,
        surname,
        dateOfBirth: date_of_birth,
        email
      }))
    );
  }
}

module.exports = UserController;
