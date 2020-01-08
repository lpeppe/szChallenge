describe("Routing functionality", () => {
  it("Navigates to add user page", () => {
    cy.visit('/users');
    cy.get("mat-sidenav-container mat-nav-list > a:nth-child(2)").click();
    cy.url().should("include", "addUser");
  });
  it("Navigates to users page", () => {
    cy.visit('/addUser');
    cy.get("mat-sidenav-container mat-nav-list > a:nth-child(1)").click();
    cy.url().should("include", "users");
  });
});
