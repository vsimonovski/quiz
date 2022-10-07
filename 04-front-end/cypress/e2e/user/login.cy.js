/// <reference types="cypress" />
describe('/login', () => {
    beforeEach(() => {
        cy.fixture('profile').then(function (profileData) {
            this.profile = profileData;
        });
        cy.visit('/login');
    });

    it('display Log in title', () => {
        cy.contains('h1', 'Log in');
    });

    it('display link to register page', () => {
        cy.contains('register now!').should('have.attr', 'href', '/register');
    });

    it('requires valid username and password', () => {
        cy.get('form').contains('Log in').click();
        cy.get('.ant-form-item-explain-error').should(
            'contain',
            'Username is required'
        );
        cy.get('.ant-form-item-explain-error').should(
            'contain',
            'Password is required'
        );
        cy.get('.ant-input').eq(0).type('vsim');
        cy.get('.ant-form-item-explain-error').should(
            'contain',
            'Username is too short'
        );
        cy.get('.ant-input').eq(1).type('123');
        cy.get('.ant-form-item-explain-error').should(
            'contain',
            'Password is too short'
        );
    });

    it("display error message when username doesn't exist", () => {
        cy.get('.ant-input').eq(0).type('username');
        cy.get('.ant-input').eq(1).type('123456');
        cy.get('form').contains('Log in').click();
        cy.contains('Username: username does not exist');
    });

    it('displays error message when password is invalid', function () {
        cy.get('.ant-input').eq(0).type(this.profile.username);
        cy.get('.ant-input').eq(1).type('123456');
        cy.get('form').contains('Log in').click();
        cy.contains('Invalid user password');
    });

    it('navigates to / on successful login', function () {
        cy.get('.ant-input').eq(0).type(this.profile.username);
        cy.get('.ant-input').eq(1).type(this.profile.password);
        cy.get('form').contains('Log in').click();
        cy.hash().should('eq', '');
    });
});
