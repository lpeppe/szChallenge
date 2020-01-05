describe("Filtering functionality", () => {
  it("Name filtering works properly", () => {
    cy.visit("/users");
    cy.get("input.mat-input-element").type("Mar");
    cy.wait(2000);
    cy.get("table tr:nth-child(1) > td.mat-column-firstName").contains("Maria");
  });

  it("Surname filtering works properly", () => {
    cy.visit("/users");
    cy.get("input.mat-input-element").type("Capp");
    cy.wait(2000);
    cy.get("table tr:nth-child(1) > td.mat-column-firstName").contains("Maria");
  });

  it("Email filtering works properly", () => {
    cy.visit("/users");
    cy.get("input.mat-input-element").type("jeglar");
    cy.wait(2000);
    cy.get("table tr:nth-child(1) > td.mat-column-firstName").contains("Maria");
  });

  it("Date of birth filtering works properly", () => {
    cy.visit("/users");
    cy.get("input.mat-input-element").type("15/05/1983");
    cy.wait(2000);
    cy.get("table tr:nth-child(1) > td.mat-column-firstName").contains("Maria");
  });
});
