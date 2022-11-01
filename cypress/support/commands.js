
Cypress.Commands.add('login', () => {
    cy.visit("/login")
    cy.intercept('GET', '**/v1/accounts/current').as('currentAccount')
    cy.url().should("include", "/login")
    cy.get("[name=email").clear().type("farrukh.abdukhalikov@gmail.com")
    cy.get("[type=submit").contains("Log in").should("be.visible").click()
    cy.url().should("include", "/password")
    cy.get("[name=password").clear().type("Costumerio-qa-2022")
    cy.get("[type=submit").contains("Log in").should("be.visible").click()
    cy.wait("@currentAccount")
})

Cypress.Commands.add('createSegment', () => {
    const randomName = (Math.random() + 1).toString(36).substring(7);
    cy.get("[id=segments-nav-link]").should("contain.text", "Segments").click()
    cy.url().should("include", "/segments")
    cy.get("div[class=fly-page-header__actions]").find("a").contains("Create Segment").click()
    cy.url().should("include", "/segments/new")
    cy.get("div[class=fly-form-group]").find("input").eq(0).clear().type(randomName)
    cy.get("[id=description]").clear().type(randomName) //
    cy.get("[type=button").contains("Create Manual Segment").should("be.visible").click()
    cy.get("h3").should("contain", randomName)
})
Cypress.Commands.add('addPeople', () => {
    const randomId = Math.floor(new Date().getTime() / 1000).toString(16)
    const randomEmail = `${randomId}@gmail.com`
    cy.intercept(`v1/environments/127422/customers/${randomId}`).as("costumersId")
    cy.get("[id=people-nav-link").should("contain.text", "People").click()
    cy.url().should("include", "/people")
    cy.get("div[class=ember-basic-dropdown]").contains("Add People").click()
    cy.get("li[class=fly-action-dropdown__item").contains("Add a Person").click()
    cy.get("input[id=attribute-value-id]").clear().type(randomId)
    cy.get("input[id=attribute-value-email]").clear().type(randomEmail)
    cy.get("[type=button").contains("Save Changes").should("be.visible").click()
    cy.wait("@costumersId")
    cy.get("h2").should("contain", randomEmail);
})
