"use strict";

const { ServiceProvider } = require("@adonisjs/fold");
const moment = require("moment");

class DateValidationProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    //
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    const Validator = use("Validator");
    Validator.extend("date", this.isDateValid, "date not valid");
    Validator.extend("name", this.isNameValid, "name not valid");
  }

  async isDateValid(data, field, message, args, get) {
    const value = get(data, field);
    if (!value) {
      /**
       * skip validation if value is not defined. `required` rule
       * should take care of it.
       */
      return;
    }
    const dateRegex = /(^(((0[1-9]|1[0-9]|2[0-8])[/](0[1-9]|1[012]))|((29|30|31)[/](0[13578]|1[02]))|((29|30)[/](0[4,6,9]|11)))[/](19|[2-9][0-9])\d\d$)|(^29[/]02[/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
    if (!dateRegex.test(value)) throw message;
    // throw error if date passed is in the future
    if (moment(value, "DD/MM/YYYY").isAfter(moment())) throw message;
  }

  async isNameValid(data, field, message, args, get) {
    const value = get(data, field);
    if (!value) {
      /**
       * skip validation if value is not defined. `required` rule
       * should take care of it.
       */
      return;
    }
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (!nameRegex.test(value)) throw message;
  }
}

module.exports = DateValidationProvider;
