describe("Form validation works", () => {
  it("Name is validated properly", () => {
    cy.visit("/addUser");
    cy.get("input[formcontrolname=firstName]").type("Luca1");
    cy.get("input[formcontrolname=surname]").click();
    cy.get("#nameFormField mat-error").should("be.visible");
    cy.get("input[formcontrolname=firstName]").clear();
    cy.get("input[formcontrolname=firstName]").type("Luca");
    cy.get("input[formcontrolname=surname]").click();
    cy.get("#nameFormField mat-error").should("not.be.visible");
  });
  it("Surname is validated properly", () => {
    cy.visit("/addUser");
    cy.get("input[formcontrolname=surname]").type("Luca1");
    cy.get("input[formcontrolname=firstName]").click();
    cy.get("#surnameFormField mat-error").should("be.visible");
    cy.get("input[formcontrolname=surname]").clear();
    cy.get("input[formcontrolname=surname]").type("Luca");
    cy.get("input[formcontrolname=firstName]").click();
    cy.get("#surnameFormField mat-error").should("not.be.visible");
  });
  it("Date is validated properly", () => {
    cy.visit("/addUser");
    cy.get("input[formcontrolname=dateOfBirth]").type("18");
    cy.get("input[formcontrolname=firstName]").click();
    cy.get("#dateFormField mat-error").should("be.visible");
    cy.get("input[formcontrolname=dateOfBirth]").type("011994");
    cy.get("input[formcontrolname=firstName]").click();
    cy.get("#dateFormField mat-error").should("not.be.visible");
  });
  it("Date autocompletition works", () => {
    cy.visit("/addUser");
    cy.get("input[formcontrolname=dateOfBirth]").type("18021994");
    cy.get("input[formcontrolname=dateOfBirth]").should(
      "have.value",
      "18/02/1994"
    );
  });
  it("Date autocompletition doesn't accept characters", () => {
    cy.visit("/addUser");
    cy.get("input[formcontrolname=dateOfBirth]").type("fsfds");
    cy.get("input[formcontrolname=dateOfBirth]").should("have.value", "");
  });
  it("Email is validated properly", () => {
    cy.visit("/addUser");
    cy.get("input[formcontrolname=email]").type("ffsdfs");
    cy.get("input[formcontrolname=firstName]").click();
    cy.get("#emailFormField mat-error").should("be.visible");
    cy.get("input[formcontrolname=email]").type("@gmail.com");
    cy.get("input[formcontrolname=firstName]").click();
    cy.get("#emailFormField mat-error").should("not.be.visible");
  });
});

// describe("User submission works", () => {
//   it("Submit button is disabled with invalid form", () => {
//     cy.visit("/addUser");
//     cy.get("button[type=submit]").should("be.disabled");
//   });
//   it("Submit button is disabled with invalid form", () => {
//     cy.visit("/addUser");
//     cy.get("button[type=submit]").should("be.disabled");
//   });

// });
