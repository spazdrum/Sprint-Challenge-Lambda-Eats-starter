/*global cy*/

describe("Test 1", function () {
    beforeEach(function() {
        cy.visit("http://localhost:3000/pizza")
    });

    it("text inputs", function() {
        cy.get('[data-cy="name"]')
        .type("Joshua Schmidt")
        .should("have.value", "Joshua Schmidt");
            
        cy.get('[type="checkbox"]')
        .check()
        .should("be.checked");

        cy.contains('Place Order').click();
    })

});