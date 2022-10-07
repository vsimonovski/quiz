/// <reference types="cypress" />

describe('/home', () => {
    beforeEach(() => {
        cy.login();
    });

    it('display Quiz title', () => {
        cy.contains('h1', 'Quiz');
    });

    it('display link to game page', () => {
        cy.contains('Play').click();
        cy.location('pathname').should('eq', '/game');
    });

    it('display link to add questions page', () => {
        cy.contains('Add Questions').click();
        cy.location('pathname').should('eq', '/add-question');
    });
});
