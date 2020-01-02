"use strict";

const { test, beforeEach } = use("Test/Suite")("UserController.addUsers");
const ace = use("@adonisjs/ace");
const Helpers = use("Helpers");
const User = use("App/Models/User");
const UserController = require(`${Helpers.appRoot()}/app/Controllers/Http/UserController`);
const fakeRequest = require("./fakeRequest");

beforeEach(async () => {
  await ace.call("migration:refresh");
  await ace.call("seed");
});

const uc = new UserController();

test("adds users properly", async ({ assert }) => {
  await uc.addUser({
    request: fakeRequest({
      firstName: "Maria",
      surname: "Bianchi",
      dateOfBirth: "25/03/1995",
      email: "mariabianchi@gmail.com"
    })
  });
  const user = (await User.findBy("email", "mariabianchi@gmail.com")).toJSON();
  assert.deepEqual(user, {
    first_name: "Maria",
    surname: "Bianchi",
    date_of_birth: "25/03/1995",
    email: "mariabianchi@gmail.com"
  });
});
