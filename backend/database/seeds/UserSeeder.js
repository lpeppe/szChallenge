"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Env = use("Env");
const User = use("App/Models/User");
const userData = require("./testData.json");

class UserSeeder {
  async run() {
    // if the seeding is not running in testing mode, user
    // data is generated randomly using the factory
    if (Env.get("NODE_ENV") != "testing")
      await Factory.model("App/Models/User").createMany(30);
    else {
      // otherwise user data is created deterministically
      await User.createMany(
        userData.map(({ firstName, surname, email, dateOfBirth }) => ({
          email,
          surname,
          first_name: firstName,
          date_of_birth: dateOfBirth
        }))
      );
    }
  }
}

module.exports = UserSeeder;
