"use strict";

class AddUser {
  get rules() {
    return {
      email: "required|email|unique:users",
      dateOfBirth: "required|date",
      surname: "required|name",
      firstName: "required|name"
    };
  }
}

module.exports = AddUser;
