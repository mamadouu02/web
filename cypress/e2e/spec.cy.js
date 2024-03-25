const backend = "https://cawrest.ensimag.fr"
const wsBase = `${backend}/bmt/boudahma/`

describe("Test de l'interface", () => {
    it("Modification de tag", () => {
        cy.intercept('GET', wsBase + 'tags', { fixture: 'tags.json' }).as('getTags')

        cy.visit('http://localhost:3000/Exercice-50.html')

        cy.wait('@getTags')

        cy.get('#menu .tags').click()
        cy.get('#items .tag.item').first().click()

        cy.get('#items .tag.item.selected input[type="text"]').clear().type('JAVASCRIPT!!!')

        cy.intercept('PUT', wsBase + 'tags/*').as('modifyTag')
        cy.intercept('GET', wsBase + 'tags', { fixture: 'modified_tags.json' }).as('getModifiedTags')

        cy.get('#items .tag.item.selected #modifyName').click()

        cy.wait('@modifyTag').its('response.statusCode').should('eq', 200)
        cy.wait('@getModifiedTags')

        cy.get('#menu .tags').click()
        cy.get('#items .tag.item').first().should('contain', 'JAVASCRIPT!!!')
    })
})