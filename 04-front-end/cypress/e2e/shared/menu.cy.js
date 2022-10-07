/// <reference types="cypress" />

describe('/menu', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('display menu title', () => {
        cy.get('nav').contains('quiz');
    });

    it('display log in and register buttons', () => {
        cy.get('nav').contains('Log in');
        cy.get('nav').contains('Register');
    });

    it('redirects to log in page when log in button is clicked', () => {
        cy.get('nav').contains('Log in').click();
        cy.location('pathname').should('eq', '/login');
    });

    it('redirects to register page when register button is clicked', () => {
        cy.get('nav').contains('Register').click();
        cy.location('pathname').should('eq', '/register');
    });

    it('display log out button when user is logged in', () => {
        cy.login();
        cy.get('nav').should(($nav) => expect($nav).contain('Log Out'));
    });
});
