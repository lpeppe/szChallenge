"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", table => {
      table.increments();
      table.string("first_name").notNullable();
      table.string("surname").notNullable();
      table.date("date_of_birth").notNullable();
      table
        .string("email")
        .notNullable()
        .unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
