describe("Test de l'interface", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/Exercice-50.html')
    })

    it("Identification de l'utilisateur", () => {
        cy.get('span.identity').should('have.text', 'boudahma')
    })

    it("Affichage des tags", () => {
        // TODO
    })

    it("Ajout de tags", () => {
        // TODO
    })

    it("Edition de tags", () => {
        // TODO
    })

    it("Modification de tags", () => {
        // TODO
    })

    it("Suppression de tags", () => {
        // TODO
    })
})