"use strict";

const Suite = use("Test/Suite")("UserController.getUsers");
const Helpers = use("Helpers");
const ace = use("@adonisjs/ace");
const fakeRequest = require("./fakeRequest");
const UserController = require(`${Helpers.appRoot()}/app/Controllers/Http/UserController`);
const { test, before } = Suite;
// seed the database before running all the tests
before(async () => {
  await ace.call("migration:refresh");
  await ace.call("seed");
});
const uc = new UserController();

test("make sure users are returned properly", async ({ assert }) => {
  const userData = await uc.getUsers({
    request: fakeRequest({ pageIndex: 0, pageSize: 3 })
  });
  assert.deepEqual(userData, {
    total: 30,
    perPage: 3,
    page: 0,
    lastPage: 10,
    data: [
      {
        id: 1,
        firstName: "Harriett",
        surname: "Rontini",
        dateOfBirth: "29/10/1980",
        email: "dehok@me.cz"
      },
      {
        id: 2,
        firstName: "Cora",
        surname: "McGuire",
        dateOfBirth: "04/06/1992",
        email: "ih@bizvo.fk"
      },
      {
        id: 3,
        firstName: "Jeremy",
        surname: "Secci",
        dateOfBirth: "20/09/1982",
        email: "ujetenren@ol.tp"
      }
    ]
  });
});

test("make sure pagination works", async ({ assert }) => {
  let userData = await uc.getUsers({
    request: fakeRequest({ pageIndex: 1, pageSize: 3 })
  });
  assert.deepEqual(userData, {
    total: 30,
    perPage: 3,
    page: 2,
    lastPage: 10,
    data: [
      {
        id: 4,
        firstName: "Maude",
        surname: "Cerbai",
        dateOfBirth: "04/08/1996",
        email: "bo@obe.ck"
      },
      {
        id: 5,
        firstName: "Sarah",
        surname: "Herrera",
        dateOfBirth: "22/08/2002",
        email: "gokok@anizojmo.kh"
      },
      {
        id: 6,
        firstName: "Hattie",
        surname: "Zini",
        dateOfBirth: "23/12/1992",
        email: "ocizupdi@ojkogul.bo"
      }
    ]
  });
  userData = await uc.getUsers({
    request: fakeRequest({ pageIndex: 2, pageSize: 2 })
  });
  assert.deepEqual(userData, {
    total: 30,
    perPage: 2,
    page: 3,
    lastPage: 15,
    data: [
      {
        id: 5,
        firstName: "Sarah",
        surname: "Herrera",
        dateOfBirth: "22/08/2002",
        email: "gokok@anizojmo.kh"
      },
      {
        id: 6,
        firstName: "Hattie",
        surname: "Zini",
        dateOfBirth: "23/12/1992",
        email: "ocizupdi@ojkogul.bo"
      }
    ]
  });
  userData = await uc.getUsers({
    request: fakeRequest({ pageIndex: 10, pageSize: 5 })
  });
  assert.deepEqual(userData, {
    total: 30,
    perPage: 5,
    page: 11,
    lastPage: 6,
    data: []
  });
});

test("make sure filtering works", async ({ assert }) => {
  // check name filtering
  let userData = await uc.getUsers({
    request: fakeRequest({ pageIndex: 0, pageSize: 10, filter: "luis" })
  });
  assert.deepEqual(userData, {
    total: 1,
    perPage: 10,
    page: 0,
    lastPage: 1,
    data: [
      {
        id: 8,
        firstName: "Luis",
        surname: "Sanz",
        dateOfBirth: "17/07/1998",
        email: "nivarek@mem.mr"
      }
    ]
  });
  // check surname filtering
  userData = await uc.getUsers({
    request: fakeRequest({ pageIndex: 0, pageSize: 10, filter: "fa" })
  });
  assert.deepEqual(userData, {
    total: 2,
    perPage: 10,
    page: 0,
    lastPage: 1,
    data: [
      {
        id: 14,
        firstName: "Oscar",
        surname: "Fabbroni",
        dateOfBirth: "28/10/2006",
        email: "pam@bep.cm"
      },
      {
        id: 22,
        firstName: "Della",
        surname: "Stefani",
        dateOfBirth: "17/04/1990",
        email: "hodpehe@humi.sa"
      }
    ]
  });
  // check date filtering
  userData = await uc.getUsers({
    request: fakeRequest({ pageIndex: 0, pageSize: 10, filter: "17/07" })
  });
  assert.deepEqual(userData, {
    total: 1,
    perPage: 10,
    page: 0,
    lastPage: 1,
    data: [
      {
        id: 8,
        firstName: "Luis",
        surname: "Sanz",
        dateOfBirth: "17/07/1998",
        email: "nivarek@mem.mr"
      }
    ]
  });
  // check email filtering
  userData = await uc.getUsers({
    request: fakeRequest({ pageIndex: 0, pageSize: 10, filter: "bo@" })
  });
  assert.deepEqual(userData, {
    total: 1,
    perPage: 10,
    page: 0,
    lastPage: 1,
    data: [
      {
        id: 4,
        firstName: "Maude",
        surname: "Cerbai",
        dateOfBirth: "04/08/1996",
        email: "bo@obe.ck"
      }
    ]
  });
});
