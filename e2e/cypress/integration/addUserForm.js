// https://docs.cypress.io/api/introduction/api.html

describe("Drawer functionality", () => {
  it("Doesn't contain the drawer in responsive mode", () => {
    cy.visit("/");
    cy.viewport(411, 823);
    cy.get("app-main-nav > mat-sidenav-container > mat-sidenav > div").should(
      "not.be.visible"
    );
  });
  it("Contains the drawer in desktop mode", () => {
    cy.viewport(1920, 1080);
    cy.visit("/");
    cy.get("nav.v-navigation-drawer").should("be.visible");
  });
  // it('Shows the drawer after clicking the hamburger menu in responsive mode', () => {
  // 	cy.visit('/');
  // 	cy.get('header button').click();
  // 	cy.get('nav.v-navigation-drawer').should('be.visible');
  // });
  // it('Hides the drawer after clicking the hamburger menu in deskop mode', () => {
  // 	cy.viewport(1920, 1080);
  // 	cy.visit('/');
  // 	cy.get('header button').click();
  // 	cy.get('nav.v-navigation-drawer').should('not.be.visible');
  // });
  // it('Shows the drawer after clicking the hamburger menu in deskop mode', () => {
  // 	cy.viewport(1920, 1080);
  // 	cy.visit('/');
  // 	cy.get('header button').click();
  // 	cy.wait(500);
  // 	cy.get('header button').click();
  // 	cy.get('nav.v-navigation-drawer').should('not.be.visible');
  // });
  // it('Contains the home link', () => {
  // 	cy.viewport(1920, 1080);
  // 	cy.visit('/');
  // 	cy.get('nav.v-navigation-drawer ').contains('Home');
  // });
  // it('Contains the stats link', () => {
  // 	cy.viewport(1920, 1080);
  // 	cy.visit('/');
  // 	cy.get('nav.v-navigation-drawer ').contains('Stats');
  // });
  // it('Navigates to stats page', () => {
  // 	cy.viewport(1920, 1080);
  // 	cy.visit('/');
  // 	cy.contains('Stats').click();
  // 	cy.url().should('include', 'Stats');
  // });
  // it('Navigates back to home page', () => {
  // 	cy.viewport(1920, 1080);
  // 	cy.visit('/');
  // 	cy.contains('Stats').click();
  // 	cy.contains('Home').click();
  // 	cy.get('#map').should('be.visible');
  // });
});
