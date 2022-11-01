describe('Login Page', () => {
  beforeEach(function () {
    cy.login()
  });
    it('QA-1 -  Add new People', () => {
        cy.addPeople()
    })
    it('QA-2 - Update People', () => {
        const randomId = Math.floor(new Date().getTime() / 1000).toString(12)
        const newRandomEmail = `${randomId}@gmail.com`
        cy.addPeople()
        cy.get("li[class=fly-nav-strip__item").contains("Attributes").click()
        cy.get("header[aria-labelledby=attributes-header]").find("a").contains("Edit Attributes").click()
        cy.get("input[id=attribute-value-email]").clear().type(newRandomEmail)
        cy.get("[type=button").contains("Save Changes").should("be.visible").click()
        cy.get("h2").should("contain", newRandomEmail);
    })
    it('QA-1 -  Delete People', () => {
        cy.intercept("**/customers/delete").as("deleteCostumer")
        cy.addPeople()
        cy.get("div[class=ember-basic-dropdown]").contains("Options").click()
        cy.get("li[class=fly-action-dropdown__item").contains("Delete forever").click()
        cy.get("input[id=people-delete-count]").clear().type("1")
        cy.get("[type=button").contains("Delete forever").should("be.visible").click()
        cy.wait("@deleteCostumer")
        cy.get("div[role=alert]")
            .find("p").should("have.text", "The selected person will be deleted soon")
    })
})