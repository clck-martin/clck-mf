import { getLoginButton, getLogoutButton } from '../../support/app.po';

describe('login success', () => {
    it('sets auth cookie when logging in via form submission', () => {
        const username = 'galadriel';
        const password = '.Elfa700#';

        cy.intercept('POST', '/api/v1/login', {
            statusCode: 200,
            headers: {
                
            },

        }).as('login2App');
        cy.visit('/')
        getLoginButton().click();
        cy.url().should('include','/login');

        cy.wait('@login2App');
        
        cy.get('input[name=username]').type(username);
        cy.get('input[name=password]').type(`${password}{enter}`);

        cy.url().should('include', '/dashboard');
        cy.getCookie('your-session-cookie').should('exist');
        cy.get('h1').should('cointain', 'galadriel');
    })

});

/*
    You'll likely also want to test your login UI for:

    Invalid username / password
    Username taken
    Password complexity requirements
    Edge cases like locked / deleted accounts

*/