"use strict";
const User = use("App/Models/User");

class UserController {
  getUsers() {
    return User.all();
  }
}

module.exports = UserController;
