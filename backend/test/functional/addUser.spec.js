const { test, trait, beforeEach } = use("Test/Suite")("GetUsers");
const User = use("App/Models/User");
const ace = use("@adonisjs/ace");

trait("Test/ApiClient");

const QUERYSTRING = "/api/v1/addUser";

beforeEach(async () => {
  await ace.call("migration:refresh");
  await ace.call("seed");
});

test("Add user works properly", async ({ client, assert }) => {
  const response = await client
    .post(QUERYSTRING)
    .send({
      firstName: "Maria",
      surname: "Bianchi",
      dateOfBirth: "25/03/1995",
      email: "mariabianchi@gmail.com"
    })
    .end();
  const user = (await User.findBy("email", "mariabianchi@gmail.com")).toJSON();
  response.assertStatus(200);
  assert.deepEqual(user, {
    first_name: "Maria",
    surname: "Bianchi",
    date_of_birth: "25/03/1995",
    email: "mariabianchi@gmail.com"
  });
});

test("Validation rejects invalid firstname", async ({ client, assert }) => {
  const response = await client
    .post(QUERYSTRING)
    .send({
      firstName: "Maria1",
      surname: "Bianchi",
      dateOfBirth: "25/03/1995",
      email: "mariabianchi@gmail.com"
    })
    .end();
  response.assertStatus(400);
});
test("Validation rejects invalid surname", async ({ client, assert }) => {
  const response = await client
    .post(QUERYSTRING)
    .send({
      firstName: "Maria",
      surname: "Bianchi1",
      dateOfBirth: "25/03/1995",
      email: "mariabianchi@gmail.com"
    })
    .end();
  response.assertStatus(400);
});

test("Validation rejects invalid date of birth", async ({ client, assert }) => {
  const response = await client
    .post(QUERYSTRING)
    .send({
      firstName: "Maria",
      surname: "Bianchi",
      dateOfBirth: "25/03/199",
      email: "mariabianchi@gmail.com"
    })
    .end();
  response.assertStatus(400);
});

test("Validation rejects invalid email", async ({ client, assert }) => {
  const response = await client
    .post(QUERYSTRING)
    .send({
      firstName: "Maria",
      surname: "Bianchi",
      dateOfBirth: "25/03/199",
      email: "mariabianchigmail.com"
    })
    .end();
  response.assertStatus(400);
});

test("Validation rejects users with same email", async ({ client, assert }) => {
  let response = await client
    .post(QUERYSTRING)
    .send({
      firstName: "Maria",
      surname: "Bianchi",
      dateOfBirth: "25/03/1995",
      email: "mariabianchi@gmail.com"
    })
    .end();
  response.assertStatus(200);
  response = await client
    .post(QUERYSTRING)
    .send({
      firstName: "Luca",
      surname: "Bianchi",
      dateOfBirth: "23/10/1995",
      email: "mariabianchi@gmail.com"
    })
    .end();
  response.assertStatus(400);
});
