describe('FIFO Test', () => {
    it('push, pop, peek', () => {
        cy.visit('http://localhost:3000/Exercice-41')

        cy.get('#newItem').type('First')
        cy.get('input[name="push"]').click()
        cy.get('#lifo li').should('have.length', 1)

        cy.get('#newItem').type('Second')
        cy.get('input[name="push"]').click()
        cy.get('#lifo li').should('have.length', 2)

        cy.get('input[name="pop"]').click()
        cy.get('#lifo li').should('have.length', 1)

        cy.get('input[name="peek"]').click()
        cy.get('#peek-area').should('have.text', 'First')
        cy.get('#lifo li').should('have.length', 1)

        cy.get('input[name="pop"]').click()
        cy.get('#lifo li').should('have.length', 0)
    })
})
