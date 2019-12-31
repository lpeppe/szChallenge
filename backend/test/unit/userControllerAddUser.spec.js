"use strict";

const Suite = use("Test/Suite")("UserController.addUsers");
const ace = use("@adonisjs/ace");

const { test, beforeEach } = Suite;

beforeEach(async () => {
  await ace.call("migration:refresh");
  await ace.call("seed");
});
