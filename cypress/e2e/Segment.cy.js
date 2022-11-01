describe('Segment Page', () => {
  beforeEach(function () {
    cy.login()
  });
    it('QA-4 -  Create Segment', () => {
       cy.createSegment()
    })
    it('QA-5 -  Update Segment', () => {
        let newRandom =  (Math.random() + 1).toString(36).substring(10);
        cy.createSegment()
        cy.get("h3").click()
        cy.get(".fly-form-control").type(newRandom)
        cy.get("[type=submit").contains("Save").should("be.visible").click()
        cy.get("h3").should("contain", newRandom)
    })
    it('QA-6 -  Delete Segment', () => {
        cy.intercept("DELETE","**/segments/*").as("deleteSegment")
        cy.createSegment()
        cy.get("div[class=ember-basic-dropdown]").contains("Options").click()
        cy.get("li[class=fly-action-dropdown__item").contains("Delete Segment").click()
        cy.get("[type=button").contains("delete segment").should("be.visible").click()
        cy.wait("@deleteSegment")

    })
})