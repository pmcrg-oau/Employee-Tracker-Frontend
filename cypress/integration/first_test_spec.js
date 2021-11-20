describe('My first test', () => {
	it('Logs in successfully if right details inputed', () => {
		cy.visit('http://localhost:3000/login');

		cy.get('#username').type('yan').should('have.value', 'yan');
		cy.get('#password').type('password').should('have.value', 'password');
		cy.get('.submit__button').click();

        cy.url().should('eq', 'http://localhost:3000/', {timeout: 2000});
	});
});

describe('Second test', () => {
	it('Doesnt login when wrong details inputed', () => {
		cy.visit('http://localhost:3000/login');

		cy.get('#username').type('webdot').should('have.value', 'webdot');
		cy.get('#password').type('@Nwafor1').should('have.value', '@Nwafor1');
        
		cy.get('.submit__button').click();

        cy.url().should('eq', 'http://localhost:3000/login');
	});
});
