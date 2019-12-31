"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const moment = require("moment");
// create an array of years to use later on to generate random
// years
const years = Array(30)
  .fill(0)
  .map((_, i) => i + 1980);

Factory.blueprint("App/Models/User", faker => {
  return {
    first_name: faker.first(),
    surname: faker.last(),
    date_of_birth: moment(
      faker.date({ year: years[Math.floor(Math.random() * 30)] })
    ).format("DD/MM/YYYY"),
    email: faker.email()
  };
});
