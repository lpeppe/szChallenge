"use strict";

/**
 * This class defines the validation rules applied to every user
 */
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
