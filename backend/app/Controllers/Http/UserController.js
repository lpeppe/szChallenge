"use strict";
const Database = use("Database");
const User = use("App/Models/User");

class UserController {
  /**
   * This method is the controller for the getUsers endpoint.
   * It receives as input an object that contains a request key.
   * This request has the following params, that must be defined
   * in the HTTP GET request.
   * @param pageIndex: the index of the page to retrieve
   * @param pageSize: the size of the page to retrieve
   * @param filter: the filter to apply on user data
   */
  getUsers({ request }) {
    let { pageIndex, pageSize, filter } = request.all();
    // in Adonis pagination 0 and 1 indexes are considered the same.
    // with this line page 0 stays the first one
    // and page 1 is considered the second
    pageIndex > 0 ? pageIndex++ : null;
    // retrieve user data from the database
    let dbQuery = Database.from("users").select(
      "id",
      "first_name as firstName",
      "surname",
      "date_of_birth as dateOfBirth",
      "email"
    );
    // if a filter is defined, apply it on the previous query
    if (filter) {
      filter = filter.trim().toLowerCase();
      dbQuery = dbQuery.whereRaw(
        `first_name LIKE '%${filter}%' 
              OR surname LIKE '%${filter}%' 
              OR email LIKE '%${filter}%'
              OR date_of_birth LIKE '%${filter}%'`
      );
    }
    // paginate data and return it
    return dbQuery.paginate(pageIndex, pageSize);
  }

  /**
   * This method is the controller for the addUser endpoint.
   * It receives as input an object that contains a request key.
   * This request has the following params, that must be defined
   * in the HTTP POST body.
   * @param firstName: The first name of the user
   * @param surname: The surname of the user
   * @param dateOfBirth: The date of birth of the user
   * @param email: The email of the user
   *
   */
  addUser({ request }) {
    const {
      firstName: first_name,
      surname,
      dateOfBirth: date_of_birth,
      email
    } = request.all();
    // create a new user and save it on the DB
    return User.create({
      first_name,
      surname,
      date_of_birth,
      email
    });
  }
}

module.exports = UserController;
