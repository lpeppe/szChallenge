const { test, trait, before } = use("Test/Suite")("GetUsers");
const ace = use("@adonisjs/ace");

trait("Test/ApiClient");

const QUERYSTRING = "/api/v1/users";

before(async () => {
  await ace.call("migration:refresh");
  await ace.call("seed");
});

test("Get list of downloads", async ({ client }) => {
  let response = await client
    .get(QUERYSTRING)
    .query({ pageIndex: 0, pageSize: 3 })
    .end();
  response.assertStatus(200);
  response.assertJSON({
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
  response = await client
    .get(QUERYSTRING)
    .query({ pageIndex: 1, pageSize: 3 })
    .end();
  response.assertStatus(200);
  response.assertJSON({
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
});

test("Get list of downloads filtered by name", async ({ client }) => {
  const response = await client
    .get(QUERYSTRING)
    .query({ pageIndex: 0, pageSize: 10, filter: "luis" })
    .end();
  response.assertStatus(200);
  response.assertJSON({
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
});

test("Get list of downloads filtered by surname", async ({ client }) => {
  const response = await client
    .get(QUERYSTRING)
    .query({ pageIndex: 0, pageSize: 10, filter: "fa" })
    .end();
  response.assertStatus(200);
  response.assertJSON({
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
});

test("Get list of downloads filtered by date of birth", async ({ client }) => {
  const response = await client
    .get(QUERYSTRING)
    .query({ pageIndex: 0, pageSize: 10, filter: "17/07" })
    .end();
  response.assertStatus(200);
  response.assertJSON({
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
});

test("Get list of downloads filtered by date of email", async ({ client }) => {
  const response = await client
    .get(QUERYSTRING)
    .query({ pageIndex: 0, pageSize: 10, filter: "bo@" })
    .end();
  response.assertStatus(200);
  response.assertJSON({
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
