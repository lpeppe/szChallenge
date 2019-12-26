"use strict";

class AddUser {
  get rules() {
    return {
      email: "required|email|unique:users",
      dateOfBirth: "required",
      surname: "required",
      firstName: "required"
    };
  }
}

module.exports = AddUser;
